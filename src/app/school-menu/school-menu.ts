import { Component, OnInit } from '@angular/core';
import { DailyMenu, MenuService } from '../services/menu-service';
import { CommonModule, DatePipe } from '@angular/common';



@Component({
  selector: 'app-school-menu',
  imports: [CommonModule, DatePipe],
  templateUrl: './school-menu.html',
  styleUrls: ['./school-menu.css']
})
export class SchoolMenuComponent implements OnInit{
  title = 'School-Menu'
  currentDay: Date =  new Date(2025, 8, 12);
  prevDayDate = new Date(this.currentDay);
  nextDayDate = new Date(this.currentDay);
  currentMenu?: DailyMenu;

  studentName = '';
  school = '';
  studentClass = ''

  constructor(private menuService: MenuService) {}

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
}
