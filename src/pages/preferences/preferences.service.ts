import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PreferencesService {

  constructor(private http: Http) {
  }

  async getMovieGenreList(): Promise<any> {
    const url = `http://localhost:3000/api/moviegenre`;
    return this.http.get(url).toPromise();
  }

  async getBookGenreList(): Promise<any> {
    const url = `http://localhost:3000/api/bookgenre`;
    return this.http.get(url).toPromise();
  }

  async getMusicGenreList(): Promise<any> {
    const url = `http://localhost:3000/api/musicgenre`;
    return this.http.get(url).toPromise();
  }

  async saveSelection(username, selectionID, tab): Promise<any> {
    const url = `http://localhost:3000/api/selection/${tab}`;
    return this.http.post(url, [username, selectionID]).toPromise();
  }

  async deleteSelection(userID, selectionID, tab): Promise<any> {
    const url = `http://localhost:3000/api/selection/${tab}/${userID}/${selectionID}`;
    return this.http.delete(url).toPromise();
  }

}
