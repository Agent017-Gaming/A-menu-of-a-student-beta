import { Component, OnInit } from '@angular/core';
import {  MenuService, DailyMenu, MenuItem  } from '../services/menu-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-school-menu',
  standalone: false,
  templateUrl: './school-menu.html',
  styleUrls: ['./school-menu.css']
})
export class SchoolMenu implements OnInit{
  menu: DailyMenu[] = [];
  currentMenu?: DailyMenu;
  title = 'School-Menu';
  studentName = '';
  school = '';
  studentClass = ''

  currentDay = new Date();
  prevDayDate = new Date(this.currentDay);
  nextDayDate = new Date(this.currentDay);
  
  constructor(private route: ActivatedRoute, private menuService: MenuService, private router: Router) {}
  

  ngOnInit(): void {
    const dateParam = this.route.snapshot.paramMap.get('date');
  if (dateParam) {
    const parsed = new Date(dateParam);
    if (!isNaN(parsed.getTime())) {
      this.currentDay = parsed;
    }
  }
    this.studentName = this.menuService.studentName;
    this.school = this.menuService.school;
    this.studentClass = this.menuService.studentClass;
    this.updateCurrentMenu();
    this.updateDays();
  }

  nextDay(): void{
    this.currentDay.setDate(this.currentDay.getDate() + 1);
    this.navigateToDate(this.currentDay);
    this.updateCurrentMenu();
    this.updateDays();
  }
  prevDay(): void{
    this.currentDay.setDate(this.currentDay.getDate() - 1);
    this.navigateToDate(this.currentDay);
    this.updateCurrentMenu();
    this.updateDays();
  }
  private navigateToDate(date: Date): void {
    const dateStr = date.toISOString().split('T')[0];
    this.router.navigate(['/menu', dateStr]);
  }

  private updateCurrentMenu(): void {
    this.menuService.getMenuForDate(this.currentDay).subscribe(menu => {
      this.currentMenu = menu;
    });
  }
  private updateDays(): void{
    this.prevDayDate = new Date(this.currentDay);
    this.prevDayDate.setDate(this.currentDay.getDate() - 1);
    this.nextDayDate = new Date(this.currentDay);
    this.nextDayDate.setDate(this.currentDay.getDate() + 1);
    
  }
  showWorkMessage(): void {
    alert("Still on work");
  }
  viewDetail(code?: string): void {
    if (code) {
      this.router.navigate(['/meal', code]);
    }
  }
  goToMeal(item: MenuItem | undefined) {
    if (!item || !item.code) {
      console.error('Cannot navigate, item or code missing', item);
      return;
    }
    const dateStr = this.currentDay.toISOString().split('T')[0];
    this.router.navigate(['/meal', item.code], { queryParams: { date: dateStr } });
  }
}
