import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Hotel } from 'src/app/models/Hotel';
import { User } from 'src/app/models/User';

interface FavoriteHotel {
  hotel_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseHotelUrl = `${this.baseUrl}hotels/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getHotels() {
    return this.httpClient.get(this.baseHotelUrl, { headers: this.getAuthHeaders() });
  }

  createHotel(data: Hotel) {
    return this.httpClient.post(`${this.baseHotelUrl}`, data, { headers: this.getAuthHeaders() });
  }

  updateHotel(id: number, data: Hotel) {
    return this.httpClient.put(`${this.baseHotelUrl}${id}/`, data, { headers: this.getAuthHeaders() });
  }

  searchHotel(searchElement: string) {
    return this.httpClient.get(`${this.baseHotelUrl}?search=${searchElement}`, { headers: this.getAuthHeaders() });
  }
  loginUser(authData: User) {
    return this.httpClient.post(`${this.baseUrl}auth/token/login`, authData, { headers: this.headers });
  }
  registerUser(authData) {
    return this.httpClient.post(`${this.baseUrl}auth/users/`, authData, { headers: this.headers });
  }

  getAuthHeaders() {
    const token = this.cookieService.get('AuthToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }

  addToFavoriteHotels(hotelId: FavoriteHotel) {
    return this.httpClient.post(`${this.baseHotelUrl}favorites/`, hotelId, { headers: this.getAuthHeaders() });
  }

  getLogedinUser() {
    return this.httpClient.get(`${this.baseUrl}auth/users/me`, { headers: this.getAuthHeaders() });
  }

  getFavHotels() {
    return this.httpClient.get(`${this.baseHotelUrl}favorites/`, { headers: this.getAuthHeaders() });
  }
  removeFavHotel(id: number) {
    return this.httpClient.delete(`${this.baseHotelUrl}favorites/${id}/`, { headers: this.getAuthHeaders() });
  }
  createNewReview(review) {
    return this.httpClient.post(`${this.baseHotelUrl}reviews/`, review, { headers: this.getAuthHeaders() });
  }
}
