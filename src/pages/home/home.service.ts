import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  constructor(private http: Http) {

  }

  async getData(user, pass): Promise<any> {
    const url = `http://localhost:3000/api/users/`;
    return this.http.post(url, {user, pass}).toPromise();
  }

  async getUserById(user): Promise<any> {
  const url = `http://localhost:3000/api/users/${user}/`;
  return this.http.get(url).toPromise();
}

}
