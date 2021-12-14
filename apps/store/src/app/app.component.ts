import { Component } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game, getAllGames$ } from '@bg-hoard/util-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Board Game Hoard 🐱 🐱 🐱';
  formatRating = formatRating;
  games$: Observable<Game[]> = getAllGames$();

  /*
    games$ = this.httpClient.get<Game[]>('/api/games');
    constructor(private httpClient: HttpClient) {}
  */
}
