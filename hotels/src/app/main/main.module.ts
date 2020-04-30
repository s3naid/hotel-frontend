import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApiService } from '../api.service';

import { MainComponent } from './main.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelFormComponent } from './hotel-form/hotel-form.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HotelReviewComponent } from './hotel-detail/hotel-review/hotel-review.component';
import { ReviewListComponent } from './review-list/review-list.component';



const routes: Routes = [
  { path: 'hotels', component: MainComponent }
];

@NgModule({
  declarations: [
    MainComponent,
    HotelListComponent,
    HotelDetailComponent,
    HotelFormComponent,
    FavoritesComponent,
    HotelReviewComponent,
    ReviewListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CookieService,
    ApiService
  ]
})
export class MainModule { }
