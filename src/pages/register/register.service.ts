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

 async addUser(user, pass, date, first, last, city, country): Promise<any> {
    let body = { "username": user, "password": pass, "birthdate": date, "firstname": first, "lastname": last, 
    "city": city, "country": country} 
    let url = `http://localhost:3000/api/newuser/`;
    return this.http.post(url, body).toPromise();
  }
}
