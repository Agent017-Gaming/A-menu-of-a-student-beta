import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


export interface MenuItem {
  name: string;
  image: string;
}

export interface DailyMenu{
    date: Date;
    breakfast: MenuItem;
    primo: MenuItem;
    secondo: MenuItem;
    contorno: MenuItem;
    dolceFruitta: MenuItem;
}

@Component({
  selector: 'app-school-menu',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './school-menu.html',
  styleUrl: './school-menu.css'
})
export class SchoolMenuComponent implements OnInit{
  studentname = 'Mario Rossi';
  school = 'Pinocchio';
  studentClass = '2/D';
  menu: DailyMenu[]= [
    {
      date: new Date(2025, 8, 12),
      breakfast: { name: 'Crostatina', image: 'assets/crostatina-ricomposta.jpg' },
      primo: { name: 'Pasta al sugo', image: 'assets/pasta_al_sugo.jpg' },
      secondo: { name: 'Pollo arrosto', image: 'assets/pollo_arrosto.jpg' },
      contorno: { name: 'Patate arrosto', image: 'assets/patate-arrosto-perfette.jpg' },
      dolceFruitta: { name: 'Mela', image: 'assets/apple.jpg' }
    }
  ];
  currentDay!: Date;
  currentMenu?: DailyMenu;
  
  ngOnInit(): void {
    this.currentDay = new Date(2025, 8, 12);
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
  private updateCurrentMenu() {
    this.currentMenu = undefined; 

    for (let m of this.menu) {
      if (
        m.date.getFullYear() === this.currentDay.getFullYear() &&
        m.date.getMonth() === this.currentDay.getMonth() &&
        m.date.getDate() === this.currentDay.getDate()
       ) {
        this.currentMenu = m;
        break;
      }
    }
  }
}
