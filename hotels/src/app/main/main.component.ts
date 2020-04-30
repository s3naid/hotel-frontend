import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

import { Hotel, FavoriteHotel } from '../models/Hotel';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

interface User {
  display_name: string;
  email: string;
}

interface FavoritedHotel {
  hotel_id: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  revHotel: Hotel;

  hotels: Hotel[] = [];
  selectedHotel = null;
  editedHotel = null;
  logedUser = null;
  favouriteHotels: FavoriteHotel[];


  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const AuthToken = this.cookieService.get('AuthToken');
    if (!AuthToken) {
      this.router.navigate(['/auth']);
    }
    this.refreshList();
    this.logedUser = this.apiService.getLogedinUser().subscribe(
      (result: User) => {
        this.logedUser = result.display_name
      }
    );

  }

  showHotelDetails(hotel: Hotel) {
    this.selectedHotel = hotel;
    this.editedHotel = null;
    this.favouriteHotels = null;
  }

  editHotelDetails(hotel: Hotel) {
    this.editedHotel = hotel;
    this.selectedHotel = null;
    this.favouriteHotels = null;
    console.log(hotel);
  }
  createNewHotel() {
    this.editedHotel = {
      name: '',
      address: '',
      geolocation: '',
      description: ''
    };
    this.selectedHotel = null;
    this.favouriteHotels = null;
  }

  //PITATI NIRMELA KOLIKO JE OVA IMPLEMENTACIJA OK, ZBOG STALIH QUERIJA

  refreshList() {
    this.apiService.getHotels().subscribe(
      (data: Hotel[]) => this.hotels = data
    );
  }

  searchHotel(searchElement) {
    if (searchElement) {
      this.apiService.searchHotel(searchElement).subscribe(
        (data: Hotel[]) => {
          this.hotels = data;
        }
      );
    } else {
      this.refreshList();
    }
  }
  logout() {
    this.cookieService.delete('AuthToken');
    this.router.navigate(['/auth']);
  }


  favHotelList() {
    this.apiService.getFavHotels().subscribe(
      (result: FavoriteHotel[]) => this.favouriteHotels = result
    );
    this.editedHotel = null;
    this.selectedHotel = null;
  }
  removeFavorite(id) {
    this.apiService.removeFavHotel(id).subscribe(
      result => {
        this.favouriteHotels = this.favouriteHotels.filter(h => h.id !== id);
        this.refreshList();
      }
    );
  }
  addHoteltoFav(favourite: FavoritedHotel) {
    this.apiService.addToFavoriteHotels(favourite).subscribe(
      result => this.showHotelDetails(result.hotel));
  }

  newReviewedHotel(review) {
    this.apiService.createNewReview(review).subscribe(
      result => {
        console.log(result),
          console.log(this.hotels.filter(hotel => hotel.id === result.hotel)),
          this.showHotelDetails(this.hotels.filter(hotel => hotel.id === result.hotel)['0']);
      });
  }

}


