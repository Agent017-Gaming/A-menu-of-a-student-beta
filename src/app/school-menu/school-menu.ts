import { Component, OnInit } from '@angular/core';
import {  MenuService, DailyMenu, MenuItem  } from '../services/menu-service';
import { Router } from '@angular/router';




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

  currentDay: Date =  new Date(2025, 8, 1);
  prevDayDate = new Date(this.currentDay);
  nextDayDate = new Date(this.currentDay);
  
  constructor(private menuService: MenuService, private router: Router) {}
  

  ngOnInit(): void {
    this.studentName = this.menuService.studentName;
    this.school = this.menuService.school;
    this.studentClass = this.menuService.studentClass;
    this.updateCurrentMenu();
    this.updateDays();
  }

  nextDay(): void{
    const newDate = new Date(this.currentDay);
    newDate.setDate(this.currentDay.getDate() + 1);
    this.currentDay = newDate;
    this.updateCurrentMenu();
    this.updateDays();
  }
  prevDay(): void{
    const newDate = new Date(this.currentDay);
    newDate.setDate(this.currentDay.getDate() - 1);
    this.currentDay = newDate;
    this.updateCurrentMenu();
    this.updateDays();
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
    this.router.navigate(['/meal', item.code]);
  }
}
