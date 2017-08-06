import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterService } from './register.service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  HomePage: HomePage;
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
  firstNameLength: number;
  lastNameLength: number;
  cityLength: number;
  firstLoadUsername: boolean;
  firstLoadPassword: boolean;
  firstLoadPasswordRep: boolean;
  firstLoadBirthdate: boolean;
  firstLoadFirstName: boolean;
  firstLoadLastName: boolean;
  firstLoadCity: boolean;
  res: any;
  usernameAlreadyExists: boolean;
  repPassIsDifferent: boolean;
  validDate: boolean;
  regEx = new RegExp(/^[0-9a-zA-Z ]+$/);
  usernameErrorMessage: string;
  passwordErrorMessage: string;
  firstnameErrorMessage: string;
  lastnameErrorMessage: string;

  constructor(public navCtrl: NavController, private RegisterService: RegisterService) {
            this.usernameLength = 0;
            this.passwordLength = 0;
            this.passwordRepLength = 0;
            this.firstNameLength = 0;
            this.lastNameLength = 0;
            this.cityLength = 0;
            this.firstLoadUsername = true;
            this.firstLoadPassword = true;
            this.firstLoadBirthdate = true;
            this.firstLoadFirstName = true;
            this.firstLoadLastName = true;
            this.firstLoadCity = true;
            this.today = new Date();
            this.usernameErrorMessage = '';
            this.passwordErrorMessage = '';
            this.firstnameErrorMessage = '';
            this.lastnameErrorMessage = '';
  
  }
 
 isInvalid() {
      if ( this.usernameLength < 6 || this.usernameAlreadyExists || this.passwordLength < 6 || this.passwordRepLength < 6 
           || this.repPassIsDifferent || !this.validDate || this.firstNameLength < 3 || this.lastNameLength < 3 
           || this.cityLength < 3 || this.country == null ) {
        return true;
      } else 
      { return false }
  }
 
  userLength() {
    this.usernameAlreadyExists = false;
    this.usernameErrorMessage = this.isValidText(this.username);
    if (this.usernameErrorMessage == '') {
    this.firstLoadUsername = false;
    if (this.username != '') {
      this.usernameLength = this.username.length;
      if (this.usernameLength >= 6) {
        this.checkIfUserExistsOnDB();
      } else { this.usernameErrorMessage = 'Username is too short'; }
    }
   }
  }
 
  passLength() {
    this.firstLoadPassword = false;
     this.passwordErrorMessage = this.isValidText(this.password);
    if (this.passwordErrorMessage == '') {
    if (this.password != '') {
      this.passwordLength = this.password.length; 
    if (this.passwordLength < 6) {
      this.passwordErrorMessage = 'Password is too short'; }
      } 
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
    this.parsedToday = ('0' + (this.today.getMonth()+1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
    this.parsedToday = this.today.getFullYear() + '-' + this.parsedToday;                  
    if (this.parsedToday > this.birthdate) {
      this.validDate = true;
    } else {
      this.validDate = false;
    }
 }

  firstNameLengthCheck() {
    this.firstLoadFirstName = false;
    this.firstnameErrorMessage = this.isValidText(this.firstName);
    if (this.firstnameErrorMessage == '') {
     if (this.firstNameLength < 3) {
       this.firstnameErrorMessage = 'First name is too short'};
    if (this.firstName != '') {
      this.firstNameLength = this.firstName.length; 
     } else { this.firstnameErrorMessage = ''}
    } 
  }

   lastNameLengthCheck() {
    this.firstLoadLastName = false;
    this.lastnameErrorMessage = this.isValidText(this.lastName);
    if (this.lastnameErrorMessage == '') {
     if (this.lastNameLength < 3) {
       this.lastnameErrorMessage = 'Last name is too short'};
    if (this.lastName != '') {
      this.lastNameLength = this.lastName.length; 
     } else { this.lastnameErrorMessage = ''}
    } 
  }

 cityLengthCheck() {
    this.firstLoadCity = false;
    if (this.city != '') {
      this.cityLength = this.city.length;
    } 
  }

 isValidText(text): string {
   if (this.regEx.test(text) || text == '') {
      return '' } else
       { return ('Illegal character entered') };
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
      const Response = await this.RegisterService.addUser(this.username, this.password, this.birthdate, this.firstName, 
      this.lastName, this.city, this.country);
      this.res = Response.json();
      this.navCtrl.push(HomePage);
      // console.log(`AppComponent::get:: got response: ${Response}`);
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
}
