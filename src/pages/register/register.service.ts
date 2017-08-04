import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class RegisterService {



  constructor(private http: Http) {


  }

  async getData(user): Promise<any> {
    let url = `http://localhost:3000/api/${user}/`;
    return this.http.get(url).toPromise();
  }

 async addUser(user): Promise<any> {
    let url = `http://localhost:3000/api/${user}/`;
    return this.http.get(url).toPromise();
  }
}
