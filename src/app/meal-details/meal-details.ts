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
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router){}
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');

    if (!this.code) {
      console.error('No meal code in route');
      this.goBack();
      return;
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
    this.router.navigate(['/menu']);
  }
}
