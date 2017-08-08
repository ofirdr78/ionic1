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
    let url = `http://localhost:3000/api/users/${user}/${pass}`;
    return this.http.get(url).toPromise();

  }

}
