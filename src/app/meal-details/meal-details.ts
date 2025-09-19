import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-details',
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit{

  code: string | null=null ;
  meal?: any;
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
