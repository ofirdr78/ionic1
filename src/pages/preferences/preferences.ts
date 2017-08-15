import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { I18nPluralPipe } from '@angular/common';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage implements OnInit {
  genres: Map<string, { id: string, genre: string, enabled: boolean }>;
  currentGenre: string;
  parsedCurrentGenre: string;
  data: any;

  constructor(public navParams: NavParams, public PreferencesService: PreferencesService) {
    this.data = this.navParams;
    this.genres = new Map();
    this.currentGenre = 'movies';
    this.parsedCurrentGenre = 'movie';
  }

  ngOnInit() {
    this.getGenres();
  }

  changePreference(pref) {
    this.currentGenre = pref;
    this.parsedCurrentGenre = pref;
    if (pref !== 'music') {
      this.parsedCurrentGenre = this.parsedCurrentGenre.substring(0, this.parsedCurrentGenre.length - 1);
    }

  }

  genreStateChange(genre: { id: string, genre: string, enabled: boolean }) {
    this.toggleButton(genre.id, genre.enabled);
  }

  async getGenres() {
    const actions = [
      this.PreferencesService.getMovieGenreList(),
      this.PreferencesService.getMusicGenreList(),
      this.PreferencesService.getBookGenreList()
    ];

    try {
    const [movies, music, books] = await Promise.all(actions);

    this.genres.set('movies', movies.json());
    this.genres.set('music', music.json());
    this.genres.set('books', books.json());
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }

  async toggleButton(selectionID, selectionEnabled) {
    try {
      if (selectionEnabled) {
        await this.PreferencesService.saveSelection(this.data.data[0].id, selectionID, this.currentGenre);
      }
      else {
        await this.PreferencesService.deleteSelection(this.data.data[0].id, selectionID, this.currentGenre);
      }
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
}
