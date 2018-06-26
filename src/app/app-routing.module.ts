import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; //imports routing module

//import various components for the routing module 
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //default route when user enters
	{ path: 'detail/:id', component: HeroDetailComponent }, //parameterized route, : means id is a placeholder path to a specific hero
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'heroes', component: HeroesComponent } //URL and component route
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ], //initializes router module at application root level
	exports: [ RouterModule] //exports to app module
})
export class AppRoutingModule { }
