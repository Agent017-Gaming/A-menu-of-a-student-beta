import { AppRoutingModule } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { SchoolMenuComponent } from './school-menu/school-menu';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SchoolMenuComponent,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
