import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../../../api.service';
import { Hotel } from 'src/app/models/Hotel';


interface ReviewModel {
  hotel?: number;
  description?: string;
  rating?: number;
}

@Component({
  selector: 'app-hotel-review',
  templateUrl: './hotel-review.component.html',
  styleUrls: ['./hotel-review.component.css']
})

export class HotelReviewComponent implements OnInit {
  @Output() reviewedHotel = new EventEmitter();
  @Input() hotel: Hotel;
  reviewForm = new FormGroup({
    reviewText: new FormControl(''),
    rating: new FormControl('')
  });


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  saveForm() {
    var reviewedHotel: ReviewModel = {};
    reviewedHotel.hotel = this.hotel.id;
    reviewedHotel.rating = this.reviewForm.value.rating;
    reviewedHotel.description = this.reviewForm.value.reviewText;
    this.reviewedHotel.emit(reviewedHotel);
  }
}
