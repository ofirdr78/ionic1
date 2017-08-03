import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  res: any;
  id: string;
  firstname: string;
  lastname: string;
  errormessage: string;
  resp: any;
  constructor(public navCtrl: NavController, private HomeService: HomeService) {

  }


  async credentialForm() {
     try {
      this.password = this.password.replace('`','');
      this.password = this.password.replace('\'','');
      
      const Response = await this.HomeService.getData(this.username, this.password);
      this.res = Response.json();
      this.resp = this.res;
      if (this.res != '') {
        this.id = this.res[0].id;
        this.firstname = this.res[0].firstname;
       this.lastname = this.res[0].lastname
       this.errormessage = '';
      } else
      {
        this.errormessage = "Wrong username or password. Please retry."
        this.id = '';
        this.firstname = '';
        this.lastname = '';
      }
 
      // console.log(`AppComponent::get:: got response: ${Response}`);

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

}
