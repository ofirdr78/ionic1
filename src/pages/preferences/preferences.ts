import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage implements OnInit {
  data: any;
  movieGenres: any;
  bookGenres: any;
  musicGenres: any;
  moviePicked: boolean;
  musicPicked: boolean;
  booksPicked: boolean;
  tab: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public PreferencesService: PreferencesService)  {
    this.data = this.navParams;
    this.moviePicked = true;
    this.musicPicked = false;
    this.booksPicked = false;
    this.tab = 'movie';

  } 

  ngOnInit()
    {

        this.getMovieGenres();
        this.getBookGenres();
        this.getMusicGenres();
    } 

  changePreference(pref) {
    this.tab = pref;
    switch (pref) {
      case 'movie': {
          this.moviePicked = true;
          this.musicPicked = false;
          this.booksPicked = false;
          break; 
      }  
      case 'music': {
          this.moviePicked = false;
          this.musicPicked = true;
          this.booksPicked = false;
          break; 
      }  
      case 'book': {
          this.moviePicked = false;
          this.musicPicked = false;
          this.booksPicked = true;
          break; 
      } 
    }     
  }

  async getMovieGenres() {   
    try {
      const Response = await this.PreferencesService.getMovieGenreList();
      this.movieGenres = Response.json(); 
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

   async getBookGenres() {   
    try {
      const Response = await this.PreferencesService.getBookGenreList();
      this.bookGenres = Response.json(); 
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async getMusicGenres() {   
    try {
      const Response = await this.PreferencesService.getMusicGenreList();
      this.musicGenres = Response.json(); 
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
}
