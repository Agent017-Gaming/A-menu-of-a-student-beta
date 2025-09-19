import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getMenu(): Observable<DailyMenu[]> {
    return this.http.get<DailyMenu[]>(this.menuUrl);
  }

  getMenuForDate(date: Date): Observable<DailyMenu | undefined> {
    return this.getMenu().pipe(
      map(menus =>
        menus.find(m =>
          new Date(m.date).toDateString() === date.toDateString()
        )
      )
    );
  }
}
