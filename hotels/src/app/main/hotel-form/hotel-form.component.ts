import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Hotel } from 'src/app/models/Hotel';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  hotelForm;
  id = null;

  @Input() set editHotel(value: Hotel) {
    this.id = value.id;
    this.hotelForm = new FormGroup({
      name: new FormControl(value.name),
      address: new FormControl(value.address),
      geolocation: new FormControl(value.geolocation),
      description: new FormControl(value.description)
    });
  }
  //WE WILL USE THIS EMIT TO REFRESH OUR HOTEL LIST
  @Output() hotelCreated = new EventEmitter<Hotel>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  saveForm() {
    if (this.id) {
      this.apiService.updateHotel(this.id, this.hotelForm.value).subscribe(
        (result: Hotel) => this.hotelCreated.emit(result));
    } else {
      this.apiService.createHotel(this.hotelForm.value).subscribe(
        (result: Hotel) => this.hotelCreated.emit(result));
    }

  }

}
