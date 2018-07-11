import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
	heroes: Hero[] = [];

 	constructor(public router: Router, private heroService: HeroService ) { //get singleton router to toggle html
 	}

 	ngOnInit() {
    	this.getHeroes();
  	}

  	title = 'Some Web App';

	random(): void {
    	var choice = this.getRandomArbitrary(0, this.heroes.length);

		//console.log(choice);
    	//console.log(this.heroes[choice].name); //logs to client browser console!

		document.getElementById('randomfood').innerHTML = this.heroes[choice].name;

  //   	myEl = angular.element(document.querySelector('#randomfood'));
		// myEl.html(this.heroes[choice].name);
  	}

  	getHeroes(): void {
	    this.heroService.getHeroes()
	        .subscribe(heroes => this.heroes = heroes);
 	}

 	getRandomArbitrary(min, max) {
    	return  Math.floor(Math.random() * (max - min) + min);
	}

}
