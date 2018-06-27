import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';

import { HeroesComponent } from './heroes/heroes.component'; //heroes list
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; //hero details
import { MessagesComponent } from './messages/messages.component'; //async messages

import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; //imports routing module

import { HttpClientModule } from '@angular/common/http'; //imports http

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HeroSearchComponent } from './hero-search/hero-search.component'; //these two imports for testing on local server
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({

  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],

  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,

  // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
  // and returns simulated server responses.
  // Remove it when a real server is ready to receive requests.
  HttpClientInMemoryWebApiModule.forRoot( //import after http client!
    InMemoryDataService, { dataEncapsulation: false }
  )
],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
