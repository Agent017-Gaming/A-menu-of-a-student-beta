// Imported Angular modules for routing

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Imported components used in routes
import { SchoolMenu } from './school-menu/school-menu';
import { MealDetails } from './meal-details/meal-details';

// Defining application routes
export const routes: Routes = [
  { path: 'menu', component: SchoolMenu },                  // /menu → SchoolMenu component
  { path: 'meal/:code', component: MealDetails },           // /meal/:code → MealDetails component (with parameter "code")
  { path: 'menu/:date', component: SchoolMenu },            // /menu/:date → SchoolMenu (with parameter "date")
  { path: '', redirectTo: '/menu', pathMatch: 'full' }      // default route → redirect to /menu ; A Standard one use in varies of sites
];
// Registers routes inside Angular's router module
@NgModule({
  imports: [RouterModule.forRoot(routes)],                  // configure router at app root
  exports: [RouterModule]                                   // make router available in the app
})
export class AppRoutingModule {}                            // Routing module class