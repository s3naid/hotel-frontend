import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Hotel } from '../../models/Hotel';

interface FavoritedHotel {
  hotel_id: number;
}
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  reviewMode = false;
  @Input() hotel: Hotel;
  @Output() newFavorite = new EventEmitter();
  @Output() newReviewedHotel = new EventEmitter();

  favHotel: FavoritedHotel = {
    hotel_id: null
  };

  constructor() { }

  ngOnInit() {
  }

  addHoteltoFav() {
    this.favHotel.hotel_id = this.hotel.id;
    this.newFavorite.emit(this.favHotel);
  }
  newReview(review) {
    this.newReviewedHotel.emit(review);
  }
}
