import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class PreferencesService {

  constructor(private http: Http) {
  }

  async getMovieGenreList(): Promise<any> {
    const url = `http://localhost:3000/api/moviegenre`;
    return this.http.get(url).toPromise();
  }

}
