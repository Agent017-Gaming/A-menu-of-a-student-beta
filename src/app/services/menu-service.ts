import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


export interface MenuItem {
  code: string;
  name: string;
  image: string;
}

export interface DailyMenu{
    date: Date;
    breakfast: MenuItem;
    first: MenuItem;
    second: MenuItem;
    side: MenuItem;
    dessertFruit: MenuItem;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private menuUrl = 'assets/menu.json';
  studentName = 'Mario Rossi';
  school = 'Pinocchio';
  studentClass = '2/D';

  constructor(private http: HttpClient) {}
  
  private mapMenuItem(item: any): MenuItem {
    return {
      code: item.code,  // use the existing code property
      name: item.name,
      image: item.image
    };
  }
  

  getMenu(): Observable<DailyMenu[]> {
    return this.http.get<any[]>(this.menuUrl).pipe(
      map(menus => menus.map(m => ({
        date: new Date(m.date),
        breakfast: this.mapMenuItem(m.breakfast),
        first: this.mapMenuItem(m.first),
        second: this.mapMenuItem(m.second),
        side: this.mapMenuItem(m.side),
        dessertFruit: this.mapMenuItem(m.dessertFruit)
      })))
    );
  }

  getMenuForDate(date: Date): Observable<DailyMenu | undefined> {
    return this.getMenu().pipe(
      map(menus =>
        menus.find(m => m.date.toDateString() === date.toDateString())
      )
    );
  }
}
