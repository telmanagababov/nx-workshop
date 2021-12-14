import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { getGame$ } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent {
  // constructor(private route: ActivatedRoute, private http: HttpClient) {}
  constructor(private route: ActivatedRoute) {}

  game$ = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('id') as string),
    switchMap((id: string) => getGame$(id))
    // switchMap((id) => this.http.get<Game>(`/api/games/${id}`))
  );
  formatRating = formatRating;
}
