import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DailyMenu, MenuService } from '../services/menu-service';



@Component({
  selector: 'app-school-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-menu.html',
  styleUrl: './school-menu.css'
})
export class SchoolMenuComponent implements OnInit{
  currentDay: Date =  new Date(2025, 8, 12);
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
  }

  nextDay(){
    const newDate = new Date(this.currentDay);
    newDate.setDate(this.currentDay.getDate() + 1);
    this.currentDay = newDate;
    this.updateCurrentMenu();
  }
  prevDay(){
    const newDate = new Date(this.currentDay);
    newDate.setDate(this.currentDay.getDate() - 1);
    this.currentDay = newDate;
    this.updateCurrentMenu();
  }
  private updateCurrentMenu(): void {
    this.currentMenu = this.menuService.getMenuForDate(this.currentDay);
  }
}
