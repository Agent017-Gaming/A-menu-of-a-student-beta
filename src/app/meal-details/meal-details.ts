import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Interface representing a meal's detailed info
export interface MealDetailsItem {
  code: string;        // unique meal identifier
  name: string;        // meal name
  description: string; // description of the meal
  quantity: string;    // portion size
  calorie: string;     // calorie info
  image: string;       // image URL/path
}

@Component({
  selector: 'app-meal-details',             // HTML tag to use this component
  imports: [CommonModule],                  // imported module (for standalone support)
  templateUrl: './meal-details.html',       // HTML template
  styleUrls: ['./meal-details.css']         // CSS styles
})
export class MealDetails implements OnInit{
  code: string | null=null ;                // meal code from route
  meal?: MealDetailsItem;                   // stores the meal info
  returnDate?: string;                      // stores return date for navigation

  // Inject route, HTTP client, and router
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router){}

  // Lifecycle hook: runs on component initialization
  ngOnInit(): void {
    // Get meal code from route parameters
    this.code = this.route.snapshot.paramMap.get('code');
    if (!this.code) {
      console.error('No meal code in route');
      this.goBack();                        // navigate back if no code
      return;
    }

    // Get optional date query parameter for navigation
    const dateParam = this.route.snapshot.queryParamMap.get('date');
    if (dateParam) {
      this.returnDate = dateParam; // store it for goBack
    }
    // Fetch meal details from JSON file
    this.http.get<any[]>('assets/meal_details.json').subscribe(data => {
      this.meal = data.find(p => p.code === this.code);   // find meal by code
      
      if (!this.meal) {
        console.warn('Meal not found');
        this.router.navigate(['/menu']);                  // redirect if meal not found
      }
    });
  }

  // Navigate back to menu page, optionally using returnDate
  goBack() {
    if (this.returnDate) {
      this.router.navigate(['/menu', this.returnDate]);
    } else {
    this.router.navigate(['/menu']);
    }
  }
}
