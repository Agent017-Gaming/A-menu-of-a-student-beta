import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  studentName = 'Mario Rossi';
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
    getMenu():DailyMenu[] {
      return [...this.menu];
    }
    getMenuForDate(date: Date): DailyMenu | undefined{
      return this.menu.find(m=>
        m.date.getFullYear() === date.getFullYear() && m.date.getMonth() === date.getMonth() && m.date.getDate() === date.getDate()
      );
    }
}
