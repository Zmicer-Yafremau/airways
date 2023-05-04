import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { IPassengerConfig, IPassengers } from 'src/app/types/IPassengerConfig';

interface IRequestInfo {
  from: string;
  destination: string;
  departureDate: string;
  departureReturnDate: string;
  passengers: IPassengers;
}

@Component({
  selector: 'app-main-search-box',
  templateUrl: './main-search-box.component.html',
  styleUrls: ['./main-search-box.component.scss'],
})
export class MainSearchBoxComponent implements OnInit {
  public searchFlyForm!: FormGroup;

  public requestInfo?: IRequestInfo;

  public airports = [
    ['Warsaw', ' WAW'],
    ['Berlin', ' BER'],
    ['Minsk', ' MSQ'],
    ['Zagreb', ' ZAG'],
  ];

  public passengersConfig: IPassengerConfig = {
    adults: {
      key: 'adults',
      title: 'Adult',
      age: '14+ years',
    },
    children: {
      key: 'children',
      title: 'Child',
      age: '2-14 years',
    },
    infants: {
      key: 'infants',
      title: 'Infant',
      age: '0-2 years',
    },
  };

  public passengers: IPassengers = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  public roundTrip = true;

  public constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.searchFlyForm = this.fb.group({
      from: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', Validators.required],
      departureReturnDate: [''],
    });
  }

  public onClick() {
    if (this.searchFlyForm.valid) {
      this.requestInfo = { ...this.searchFlyForm.value, passengers: this.passengers };
      console.log(this.requestInfo);
    }
  }

  public typeOfTrip(e: MatRadioChange) {
    this.roundTrip = e.value === 'round';
  }

  public handlePassengersChange(newPassengers: IPassengers) {
    this.passengers = { ...newPassengers };
    console.log('new passengers', this.passengers);
  }

  public reverse() {
    console.log('reverse');
  }
}
