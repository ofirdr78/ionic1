import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterService } from './register.service';
import { HomePage } from '../home/home';
import { PreferencesPage} from '../preferences/preferences';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  HomePage: HomePage;
  PreferencesPage: PreferencesPage;
  RegEx = /^[0-9a-zA-Z]+$/;
  noDigitsRegEx = /^[a-zA-Z ]+$/;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.RegEx), Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: ['', [Validators.required, this.birthdateValid]],
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]],
    country: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]]
  });

  usernameAlreadyExists: boolean;
  matchPasswords: boolean;
  res: any;

  constructor(public navCtrl: NavController, private RegisterService: RegisterService, public fb: FormBuilder) {
    this.usernameAlreadyExists = false;
    this.matchPasswords = true;

  }

  birthdateValid(c: FormControl) {
    const today = new Date();
    let parsedToday = ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    parsedToday = today.getFullYear() + '-' + parsedToday;
    if (c.value < parsedToday) {
      return null;
    } else {
      return {dateValid: true};
    }
  }

  checkMatchpasswords() {
    this.matchPasswords = this.loginForm.controls.password.value === this.loginForm.controls.confirm.value;
  }

  async checkIfUserExistsOnDB() {
    if (!this.loginForm.controls.username.valid) {
      this.usernameAlreadyExists = false;
      return;
    }

    try {
      await this.RegisterService.getUserById(this.loginForm.controls.username.value);
      this.usernameAlreadyExists = true;

    } catch (ex) {
      if (ex.status === 404) {
        this.usernameAlreadyExists = false;
        return;
      }

      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async addUser() {
    this.loginForm.controls.password.setValue(sha512(this.loginForm.controls.password.value));
    try {
      await this.RegisterService.addUser(this.loginForm.getRawValue());    
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
    try {
      const Response = await this.RegisterService.getData(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
      this.res = Response.json();
      this.navCtrl.push(PreferencesPage, this.res);
    }
    catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
  
}
