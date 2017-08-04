import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterService } from './register.service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  passwordRep: string;
  birthdate: string;
  today: any;
  parsedToday: string;
  city: string;
  country: string;
  usernameLength: number;
  passwordLength: number;
  passwordRepLength: number;
  firstLoadUsername: boolean;
  firstLoadPassword: boolean;
  firstLoadPasswordRep: boolean;
  firstLoadBirthdate: boolean;
  res: any;
  usernameAlreadyExists: boolean;
  repPassIsDifferent: boolean;
  validDate: boolean;
  constructor(public navCtrl: NavController, private RegisterService: RegisterService) {
         this.usernameLength = 0;
         this.passwordLength = 0;
         this.passwordRepLength = 0;
          this.firstLoadUsername = true;
          this.firstLoadPassword = true;
          this.firstLoadBirthdate = true;
          this.today = new Date();
  }
 
 isInvalid() {
      if ( this.usernameLength < 6 || this.usernameAlreadyExists || this.passwordLength < 6 || this.passwordRepLength < 6 
      || this.repPassIsDifferent || !this.validDate ) {
        return true;
      } else 
      { return false }
  }
 
  userLength() {
    this.usernameAlreadyExists = false;
    this.firstLoadUsername = false;
    if (this.username != '') {
      this.usernameLength = this.username.length;
      if (this.usernameLength >= 6) {
        this.checkIfUserExistsOnDB();
      }
    } 
  }
 
  passLength() {
    this.firstLoadPassword = false;
    if (this.password != '') {
      this.passwordLength = this.password.length;
    } 
  }

   passRepLength() {
    this.firstLoadPasswordRep = false;
    if (this.passwordRep != '') {
      this.passwordRepLength = this.passwordRep.length;
    } 
    if (this.passwordRep != this.password) {
      this.repPassIsDifferent = true;
    } else {
      this.repPassIsDifferent = false;
    }
  }

  birthdateCheck() {
    this.firstLoadBirthdate = false;
    console.log(this.birthdate);
    this.parsedToday = ('0' + (this.today.getMonth()+1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
    this.parsedToday = this.today.getFullYear() + '-' + this.parsedToday;                  
    if (this.parsedToday > this.birthdate) {
      this.validDate = true;
    } else {
      this.validDate = false;
    }
 }

 async checkIfUserExistsOnDB() {
     try {
      const Response = await this.RegisterService.getData(this.username);
      this.res = Response.json();
       if (this.res[0] == undefined) {
         this.usernameAlreadyExists = false;
       } else {
         this.usernameAlreadyExists = true;
       }
      
      // console.log(`AppComponent::get:: got response: ${Response}`);

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
 }

async addUser() {
   try {
      const Response = await this.RegisterService.addUser(this.username);
      this.res = Response.json();
      // console.log(`AppComponent::get:: got response: ${Response}`);
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
}
