import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

import { Hotel } from 'src/app/models/Hotel';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  faEdit = faEdit;
  faCommentDots = faCommentDots;

  @Input() hotels: Hotel[] = [];
  @Output() selectedHotel = new EventEmitter<Hotel>();
  @Output() editSelectedHotel = new EventEmitter<Hotel>();
  @Output() hotelReviewList = new EventEmitter<Hotel>();
  @Output() newHotel = new EventEmitter();
  @Output() newSearch = new EventEmitter();

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }
  selectHotel(hotel: Hotel) {
    this.selectedHotel.emit(hotel);
  }
  editHotel(hotel: Hotel) {
    this.editSelectedHotel.emit(hotel);
  }
  createNewHotel() {
    this.newHotel.emit();
  }
  submitSearchForm() {
    this.newSearch.emit(this.searchForm.value.search);
  }
  clearSearch() {
    this.newSearch.emit(null);
  }
  reviewList(hotel: Hotel) {
    this.hotelReviewList.emit(hotel);
  }
}
