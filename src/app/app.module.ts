import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';

import { HeroesComponent } from './heroes/heroes.component'; //heroes list
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; //hero details
import { MessagesComponent } from './messages/messages.component'; //async messages

import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; //imports routing module

@NgModule({

  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],

  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule
],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
