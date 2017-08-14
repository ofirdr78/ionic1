import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { PreferencesService } from './preferences.service';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage implements OnInit {
  genres: Map<string, { id: string, genre: string, enabled: boolean }>;
  currentGenre: string;
  data: any;

  constructor(public navParams: NavParams, public PreferencesService: PreferencesService) {
    this.data = this.navParams;
    this.genres = new Map();
  }

  ngOnInit() {
    this.getGenres();
  }

  changePreference(pref) {
    this.currentGenre = pref;
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

    // TODO: Add try/catch block
    const [movies, music, books] = await Promise.all(actions);

    this.genres.set('movies', movies.json());
    this.genres.set('music', music.json());
    this.genres.set('books', books.json());
  }

  async toggleButton(selectionID, selectionEnabled) {
    try {
      if (selectionEnabled) {
        await this.PreferencesService.saveSelection(this.data.data[0].id, selectionID, this.tab);
      }
      else {
        await this.PreferencesService.deleteSelection(this.data.data[0].id, selectionID, this.tab);
      }
    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
  }
}
