import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from './home.service';
import { RegisterPage } from '../register/register';
import { PreferencesPage } from '../preferences/preferences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registerPage: RegisterPage;
  PreferencesPage: PreferencesPage;
  username: string;
  password: string;
  res: any;
  id: string;
  firstname: string;
  lastname: string;
  errormessage: string;
  resp: any;
  usernameLength: number;
  passwordLength: number;
  firstLoadUsername: boolean;
  firstLoadPassword: boolean;

  constructor(public navCtrl: NavController, private HomeService: HomeService) {
    this.usernameLength = 0;
    this.passwordLength = 0;
    this.firstLoadUsername = true;
    this.firstLoadPassword = true;

  }

  async credentialForm() {
    try {
      const Response = await this.HomeService.getData(this.username, this.password);
      this.res = Response.json();
      this.resp = this.res;
      this.navCtrl.push(PreferencesPage, this.res);

      // console.log(`AppComponent::get:: got response: ${Response}`);

    } catch (ex) {
      if (ex.status === 404) {
        this.errormessage = 'Wrong username or password. Please retry.';
        this.id = '';
        this.firstname = '';
        this.lastname = '';
        return;
      }

      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  isInvalid() {
    if (this.usernameLength < 6 || this.passwordLength < 6) {
      return true;
    } else {
      return false;
    }
  }

  userLength() {
    this.firstname = '';
    this.lastname = '';
    this.errormessage = '';
    this.firstLoadUsername = false;
    if (this.username !== '') {
      this.usernameLength = this.username.length;
    }
  }

  passLength() {
    this.firstname = '';
    this.lastname = '';
    this.errormessage = '';
    this.firstLoadPassword = false;
    if (this.password !== '') {
      this.passwordLength = this.password.length;
    }
  }

  pushPage() {
    this.navCtrl.push(RegisterPage);
  }

}
