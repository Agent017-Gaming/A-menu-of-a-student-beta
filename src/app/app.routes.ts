import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolMenu } from './school-menu/school-menu';
import { MealDetails } from './meal-details/meal-details';

export const routes: Routes = [
  { path: 'menu', component: SchoolMenu },
  { path: 'meal/:code', component: MealDetails },
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}