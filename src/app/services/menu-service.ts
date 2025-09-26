import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Data models
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
// Service available app-wide
@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private menuUrl = 'assets/menu.json';     // JSON file with menu data
  studentName = 'Mario Rossi';
  school = 'Pinocchio';
  studentClass = '2/D';

  constructor(private http: HttpClient) {}  // inject HttpClient
  
  // Helper method: convert raw JSON item into MenuItem type
  private mapMenuItem(item: any): MenuItem {
    return {
      code: item.code,
      name: item.name,
      image: item.image
    };
  }
  
  // Fetch and map the full menu list from JSON
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

  // Fetch a menu for a specific date
  getMenuForDate(date: Date): Observable<DailyMenu | undefined> {
    return this.getMenu().pipe(
      map(menus =>
        menus.find(m => m.date.toDateString() === date.toDateString())
      )
    );
  }
}
