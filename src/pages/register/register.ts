import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterService } from './register.service';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  HomePage: HomePage;
  RegEx = /^[0-9a-zA-Z]+$/;
  noDigitsRegEx = /^[a-zA-Z ]+$/;
  public loginForm = this.fb.group({
          username: ['', [Validators.required, Validators.pattern(this.RegEx), Validators.minLength(6)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm: ['', [Validators.required, Validators.minLength(6)]],
          birthdate: ['', [Validators.required, this.birthdateValid]],
          firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]],
          lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.noDigitsRegEx)]],
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
    let today = new Date();
    let parsedToday = ('0' + (today.getMonth()+ 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    parsedToday = today.getFullYear() + '-' + parsedToday;   
    if (c.value < parsedToday) {
      return null
    } else {
      return { dateValid: true }
    }
 }

 checkMatchpasswords() {
   if (this.loginForm.controls.password.value === this.loginForm.controls.confirm.value) {
     this.matchPasswords = true;
   } else {
     this.matchPasswords = false;
   }

 }
 async checkIfUserExistsOnDB() {
   
     if (this.loginForm.controls.username.valid) {
     try {
      const Response = await this.RegisterService.getData(this.loginForm.controls.username.value);
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
    } else {
      this.usernameAlreadyExists = false;
    }
 }

  async addUser() {
    try {
        const Response = await this.RegisterService.addUser(this.loginForm.controls.username.value, this.loginForm.controls.password.value, 
        this.loginForm.controls.birthdate.value, this.loginForm.controls.firstName.value, this.loginForm.controls.lastName.value , 
        this.loginForm.controls.city.value, this.loginForm.controls.country.value);
        this.res = Response.json();
        this.navCtrl.push(HomePage);
        // console.log(`AppComponent::get:: got response: ${Response}`);
      } catch (ex) {
        console.error(`AppComponent::get:: errored with: ${ex}`);
      }
    }
}


