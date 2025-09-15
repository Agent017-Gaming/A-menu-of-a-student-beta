import { Component } from '@angular/core';
import { SchoolMenuComponent  } from './school-menu/school-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SchoolMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'School-Menu'
}
