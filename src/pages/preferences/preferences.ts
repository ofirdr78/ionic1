import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage {
  tab1: any;
  data: any;
  movieGenres: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public PreferencesService: PreferencesService) {
    this.data = this.navParams;
    this.getMovieGenres();

  }

  async getMovieGenres() {   
    try {
      const Response = await this.PreferencesService.getMovieGenreList();
      this.movieGenres = Response.json(); 
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

}
