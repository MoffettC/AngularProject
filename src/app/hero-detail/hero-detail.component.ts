import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

	constructor(
		  private route: ActivatedRoute, //holds info about route to this instance of herodetail, ie: hero id in URL
		  private heroService: HeroService,
		  private location: Location //used to back navigate in browser  history stack
	) { }

	ngOnInit(): void {
	  this.getHero();
	}

	getHero(): void {
	  const id = +this.route.snapshot.paramMap.get('id'); //image of route, with paramMap to id, '+' converts route string params to int
	  this.heroService.getHero(id)
	    .subscribe(hero => this.hero = hero); //service.subscribe returns a callback that exec the method inside 
	}

	save(): void {
	   this.heroService.updateHero(this.hero) //service.subscribe returns a callback that exec the method inside 
	     .subscribe(() => this.goBack());
	 }

	goBack(): void {
		this.location.back();
	}

}
