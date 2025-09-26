import { Component, OnInit } from '@angular/core';
import {  MenuService, DailyMenu, MenuItem  } from '../services/menu-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-school-menu',              // HTML tag to use this component
  standalone: false,                        // declared inside a module, not standalone
  templateUrl: './school-menu.html',        // HTML template
  styleUrls: ['./school-menu.css']          // CSS styles
})
export class SchoolMenu implements OnInit{
  menu: DailyMenu[] = [];                   // list of menus (not directly used here)
  currentMenu?: DailyMenu;                  // currently selected day’s menu
  title = 'School-Menu';                    // page title
  studentName = '';
  school = '';
  studentClass = ''

  currentDay = new Date();                  // current date (default: today)
  prevDayDate = new Date(this.currentDay);  // previous day
  nextDayDate = new Date(this.currentDay);  // next day
  
  // Inject route for parameters, service for data, and router for navigation
  constructor(private route: ActivatedRoute, private menuService: MenuService, private router: Router) {}
  
  // Lifecycle hook, runs once when component loads
  ngOnInit(): void {
    // Check if URL contains a date parameter
    const dateParam = this.route.snapshot.paramMap.get('date');
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        this.currentDay = parsed;           // valid date found, update currentDay
      }
    }
    this.studentName = this.menuService.studentName;      // Load student info from service
    this.school = this.menuService.school;
    this.studentClass = this.menuService.studentClass;
    // Initialize menu and navigation dates
    this.updateCurrentMenu();
    this.updateDays();
  }

  // Navigate to next day's menu
  nextDay(): void{
    this.currentDay.setDate(this.currentDay.getDate() + 1);
    this.navigateToDate(this.currentDay);
    this.updateCurrentMenu();
    this.updateDays();
  }

  // Navigate to previous day's menu
  prevDay(): void{
    this.currentDay.setDate(this.currentDay.getDate() - 1);
    this.navigateToDate(this.currentDay);
    this.updateCurrentMenu();
    this.updateDays();
  }

  // Helper: navigate using router and update URL with date
  private navigateToDate(date: Date): void {
    const dateStr = date.toISOString().split('T')[0];
    this.router.navigate(['/menu', dateStr]);
  }

  // Fetch menu for the currently selected day
  private updateCurrentMenu(): void {
    this.menuService.getMenuForDate(this.currentDay).subscribe(menu => {
      this.currentMenu = menu;
    });
  }
  // Update prev/next day dates relative to currentDay
  private updateDays(): void{
    this.prevDayDate = new Date(this.currentDay);
    this.prevDayDate.setDate(this.currentDay.getDate() - 1);
    this.nextDayDate = new Date(this.currentDay);
    this.nextDayDate.setDate(this.currentDay.getDate() + 1);
  }
  // Simple placeholder alert
  showWorkMessage(): void {
    alert("Still on work");
  }
  // Navigate to meal detail by code
  viewDetail(code?: string): void {
    if (code) {
      this.router.navigate(['/meal', code]);
    }
  }
  // Navigate to meal detail including date in query params
  goToMeal(item: MenuItem | undefined) {
    if (!item || !item.code) {
      console.error('Cannot navigate, item or code missing', item);
      return;
    }
    const dateStr = this.currentDay.toISOString().split('T')[0];
    this.router.navigate(['/meal', item.code], { queryParams: { date: dateStr } });
  }
}
