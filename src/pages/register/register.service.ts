import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) {
  }

  async getUserById(user): Promise<any> {
    const url = `http://localhost:3000/api/users/${user}/`;
    return this.http.get(url).toPromise();
  }

  async addUser(userFormRaw: any): Promise<any> {
    delete userFormRaw.confirm;
    const url = `http://localhost:3000/api/newuser/`;
    return this.http.post(url, userFormRaw).toPromise();
  }

  async getData(user, pass): Promise<any> {
    const url = `http://localhost:3000/api/users/`;
    return this.http.post(url, {user, pass}).toPromise();
  }
}
