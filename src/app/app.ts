import { Component } from '@angular/core'; //Imported Angular's Component decorator

// Defining the root component
@Component({
  selector: 'app-root',     // custom HTML tag: <app-root>
  standalone: false,        // uses NgModule (not standalone)
  templateUrl: './app.html',// HTML template for the view
  styleUrls: ['./app.css']  // CSS styles for this component; Also 1 extra detail: We can use multiple style src for 1 page
})
export class App {}         // Component class (logic goes here, currently none)