import { AppRoutingModule } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { SchoolMenu } from './school-menu/school-menu';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    App,
    SchoolMenu,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [App]
})
export class AppModule {}
