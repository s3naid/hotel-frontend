import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ApiService } from '../../api.service';
import { FavoriteHotel } from 'src/app/models/Hotel';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  faTrash = faTrash;
  @Input() favouriteHotels: FavoriteHotel[] = [];
  @Output() removedFavoriteMovie = new EventEmitter();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  deleteFavorite(hotel) {
    this.removedFavoriteMovie.emit(hotel.id);
  }

}
