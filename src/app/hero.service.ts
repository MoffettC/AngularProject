import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {	//must be before decorators!
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class HeroService {

	//currently because http is being mocked to local memory,
	//the database is being pulled from in-memory-data service db
	//will implement a mysql db and replace this url
	private heroesUrl = '/api/heroes';  // URL to web api, http://chrismoffett.herokuapp.com/

	constructor(
  		private http: HttpClient,
  		private messageService: MessageService) { } // message service is an injected logger

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
  		this.messageService.add('Logger: ' + message);
	}
	
	/** GET heroes from the server */
	getHeroes (): Observable<Hero[]> {	//returns an observable array of hero[] json obj
	  return this.http.get<Hero[]>(this.heroesUrl)
	    .pipe(
	      tap(heroes => this.log(`fetched foods`)),
	      catchError(this.handleError('getHeroes', []))
	    );
	}

	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {	
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.get<Hero>(url).pipe(
	    tap(_ => this.log(`fetched food id=${id}`)),
	    catchError(this.handleError<Hero>(`getHero id=${id}`))
	  );
	}

	/** GET hero by id. Return `undefined` when id not found */
	getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url)
		  .pipe(
		    map(heroes => heroes[0]), // returns a {0|1} element array
		    tap(h => {
		      const outcome = h ? `fetched` : `did not find`;
		      this.log(`${outcome} food id=${id}`);
		    }),
		    catchError(this.handleError<Hero>(`getHero id=${id}`))
		  );
	}

  	/** GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<Hero[]> {
	  if (!term.trim()) {
	    // if not search term, return empty hero array.
	    console.log('not a term');
	    return of([]);
	  }
	  return this.http.get<Hero[]>(`${this.heroesUrl}/s?name=${term}`).pipe( //?query tag not param
	    tap(_ => this.log(`found foods matching "${term}"`)),
	    catchError(this.handleError<Hero[]>('searchHeroes', []))
	  );
	}

	/** PUT: update the hero on the server */ 
	updateHero (hero: Hero): Observable<any> {
	  return this.http.put(this.heroesUrl, hero, httpOptions).pipe( //send hero obj
	    tap(_ => this.log(`updated food id=${hero.id}`)),
	    catchError(this.handleError<any>('updateHero'))
	  );
	}


	/** POST: add a new hero to the server */
	addHero (hero: Hero): Observable<Hero> {
	  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe( //send hero obj
	    tap((hero: Hero) => this.log(`added food w/ id=${hero.id}`)),
	    catchError(this.handleError<Hero>('addHero'))
	  );
	}

	/** DELETE: delete the hero from the server */
	deleteHero (hero: Hero | number): Observable<Hero> {
	  const id = typeof hero === 'number' ? hero : hero.id;
	  const url = `${this.heroesUrl}/${id}`;

	  return this.http.delete<Hero>(url, httpOptions).pipe( //only send hero id
	    tap(_ => this.log(`deleted food id=${id}`)),
	    catchError(this.handleError<Hero>('deleteHero'))
	  );
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */

	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}


} 
