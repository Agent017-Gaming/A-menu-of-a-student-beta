// Imported routing module, Angular core, and essential modules
import { AppRoutingModule } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Import application components
import { App } from './app';
import { SchoolMenu } from './school-menu/school-menu';
import { DatePipe } from '@angular/common';
import { MealDetails } from "./meal-details/meal-details";

// Rooting the Angular module
@NgModule({
  declarations: [               // Components declared in this module (not standalone)
    App,
    SchoolMenu,
  ],
  imports: [                    // External modules + standalone components to imported
    BrowserModule,              // Angular base for browser apps
    HttpClientModule,           // enables HTTP requests
    AppRoutingModule,           // routing setup
    MealDetails                 // standalone component (works via imports)
],
  // Services/providers available app-wide
  providers: [DatePipe],
  // Root component to bootstrap (Need for launching the "App" component)
  bootstrap: [App]
})
export class AppModule {}
