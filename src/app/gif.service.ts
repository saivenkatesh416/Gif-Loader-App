/**
 * Created by venkatesh on 2/3/18.
 */

import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { GIFS } from './gif.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class GifService {
  constructor(private http: Http){}

  gifs : Array<GIFS> = new Array(20);

  getGifs(search: String, offset: Number): Observable<GIFS[]>{
    const apikey = 'dc6zaTOxFJmzC';
    const value = JSON.stringify(search);

    let obj = JSON.parse(value);
    const name_string = obj.search;

    const search_string = name_string.replace(" ", "+");

    return this.http.get('http://api.giphy.com/v1/gifs/search?q=' + search_string + '&api_key=' + apikey + '&limit=20&offset=' + offset)
      .map(this.extractData.bind(this))
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();

    let total_no_of_gifs = body.pagination.count;
    let no_of_gifs;

    for(no_of_gifs = 0; no_of_gifs < total_no_of_gifs; no_of_gifs++) {
      this.gifs[no_of_gifs] = body.data[no_of_gifs].embed_url;
    }
    return this.gifs;
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
