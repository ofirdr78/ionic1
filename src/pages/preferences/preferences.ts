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
  movieGenresFromDB: any;
  musicGenresFromDB: any;
  bookGenresFromDB: any;
  movieGenresSelects: { genre: string; id: number; enabled: boolean}[];
  musicGenresSelects: { genre: string; id: number; enabled: boolean}[];
  bookGenresSelects: { genre: string; id: number; enabled: boolean}[];
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
    this.tab = 'movies';
    this.movieGenresSelects = [];
    this.musicGenresSelects = [];
    this.bookGenresSelects = [];
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
      case 'movies': {
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
      case 'books': {
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
      this.movieGenresFromDB = Response.json(); 
      for (const Genre of this.movieGenresFromDB) {
        this.movieGenresSelects.push({genre: Genre.genre, id: Genre.id, enabled: false});
      }
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async getBookGenres() {   
    try {
      const Response = await this.PreferencesService.getBookGenreList();
      this.bookGenresFromDB = Response.json();
      for (const Genre of this.bookGenresFromDB) {
        this.bookGenresSelects.push({genre: Genre.genre, id: Genre.id, enabled: false});
      }
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async getMusicGenres() {   
    try {
      const Response = await this.PreferencesService.getMusicGenreList();
      this.musicGenresFromDB = Response.json(); 
      for (const Genre of this.musicGenresFromDB) {
        this.musicGenresSelects.push({genre: Genre.genre, id: Genre.id, enabled: false});
      }
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async toggleButton(selectionID, selectionEnabled) {
     try {
          if (selectionEnabled) { 
             const Response = await this.PreferencesService.saveSelection(this.data.data[0].id, selectionID, this.tab);
             }
          else {
             const Response = await this.PreferencesService.deleteSelection(this.data.data[0].id, selectionID, this.tab);
               }
    } catch (ex) {
     console.error(`AppComponent::get:: errored with: ${ex}`);
      }
  }
}
