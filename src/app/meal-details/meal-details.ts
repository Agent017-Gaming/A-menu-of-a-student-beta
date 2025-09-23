import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface MealDetailsItem {
  code: string;
  name: string;
  description: string;
  quantity: string;
  calorie: string;
  image: string;
}

@Component({
  selector: 'app-meal-details',
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrls: ['./meal-details.css']
})
export class MealDetails implements OnInit{

  code: string | null=null ;
  meal?: MealDetailsItem;
  returnDate?: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router){}
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');

    if (!this.code) {
      console.error('No meal code in route');
      this.goBack();
      return;
    }

    const dateParam = this.route.snapshot.queryParamMap.get('date');
    
    if (dateParam) {
      this.returnDate = dateParam; // store it for goBack
    }
    
    this.http.get<any[]>('assets/meal_details.json').subscribe(data => {
      this.meal = data.find(p => p.code === this.code);
      
      if (!this.meal) {
        console.warn('Meal not found');
        this.router.navigate(['/menu']);
      }
    });
  }
  goBack() {
    if (this.returnDate) {
      this.router.navigate(['/menu', this.returnDate]);
    } else {
    this.router.navigate(['/menu']);
    }
  }
}
