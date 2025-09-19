import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import mealData from '../../assets/meal_details.json';

interface Meal {
  code: string;
  name: string;
  descrizione: string;
  quantity: string;
  calorie: string;
}
@Component({
  selector: 'app-meal-details',
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit{

  code: string | null=null ;
  meal?: Meal;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router){}
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
     this.http.get<any[]>('assets/meal_details.json').subscribe(data => {
      this.meal = data.find(p => p.code === this.code);
    });
  }
  goBack() {
    this.router.navigate(['/menu']);
  }
}
