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
  
  user: { username: string;
          password: string;
          confirm: string;
          birthdate: string;
          firstName: string;
          lastName: string;
          city: string;
          country: string; 
        }
  
 usernameAlreadyExists: boolean;
 matchPasswords: boolean;
 dateValid: boolean;
 today: any;
 parsedToday: string;
 res: any;
 regEx = new RegExp(/^[0-9a-zA-Z ]+$/);
 illegalCharacterErrorMessage: string;

  constructor(public navCtrl: NavController, private RegisterService: RegisterService) {
              this.usernameAlreadyExists = false;
              this.dateValid = false;
              this.matchPasswords = true;
              this.illegalCharacterErrorMessage = '';
              this.today = new Date();
              this.user = { username: '',
                            password: '',
                            confirm: '',
                            birthdate: '',
                            firstName: '',
                            lastName: '',
                            city: '',
                            country: ''}
  }
 
 isValid() {
      if ( 
        this.user.username !=='' &&
        this.user.password !=='' && 
        this.user.birthdate !=='' && 
        this.user.firstName !=='' && 
        this.user.lastName !=='' &&
        this.user.city !=='' && 
        this.user.country !==''
      ) {
          console.log('form valid');
        return true;
      
      } else 
      {   console.log('form invalid');
        return false }
  
  }

 isValidText(text) {
   if (this.regEx.test(text) || text == '') {
      this.illegalCharacterErrorMessage = '' } else
       { this.illegalCharacterErrorMessage = 'Illegal character entered'; };
 }
 
 checkMatchpasswords() {
   if (this.user.password !== this.user.confirm) {
     this.matchPasswords = false;
   } else {
     this.matchPasswords = true;
   }
 }

 birthdateCheck() {
    this.parsedToday = ('0' + (this.today.getMonth()+1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);
    this.parsedToday = this.today.getFullYear() + '-' + this.parsedToday;                  
    if (this.parsedToday > this.user.birthdate) {
      this.dateValid = true;
    } else {
      this.dateValid = false;
    }
 }

 async checkIfUserExistsOnDB() {
     this.isValidText(this.user.username);
     if (this.user.username.length >= 6) {

     try {
      const Response = await this.RegisterService.getData(this.user.username);
      this.res = Response.json();
       if (this.res[0] == undefined) {
         this.usernameAlreadyExists = false;
       } else {
         this. usernameAlreadyExists = true;
       }
      
      // console.log(`AppComponent::get:: got response: ${Response}`);

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
      }
    }
 }

  async addUser() {
    try {
        const Response = await this.RegisterService.addUser(this.user.username, this.user.password, this.user.birthdate, this.user.firstName, 
        this.user.lastName, this.user.city, this.user.country);
        this.res = Response.json();
        this.navCtrl.push(HomePage);
        // console.log(`AppComponent::get:: got response: ${Response}`);
      } catch (ex) {
        console.error(`AppComponent::get:: errored with: ${ex}`);
      }
    }
}
