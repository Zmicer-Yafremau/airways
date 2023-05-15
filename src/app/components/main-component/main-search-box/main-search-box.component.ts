import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { AirportContentService } from 'src/app/services/airport-content.service';
import { IPassengerConfig, IPassengers } from 'src/app/types/IPassengerConfig';
import { IUserRequestInfo } from 'src/app/types/IUserRequestInfo';

@Component({
  selector: 'app-main-search-box',
  templateUrl: './main-search-box.component.html',
  styleUrls: ['./main-search-box.component.scss'],
})
export class MainSearchBoxComponent implements OnInit {
  public searchFlyForm!: FormGroup;

  public requestInfo!: IUserRequestInfo;

  public airports$ = this.airportService.airports$;

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
    sum: 0,
  };

  public roundTrip = true;

  public airportDepartureNameForSelectHeader = '';

  public airportArrivalNameForSelectHeader = '';

  public constructor(
    public fb: FormBuilder,
    private getUserRequestService: GetUserRequestInfoService,
    private router: Router,
    public airportService: AirportContentService,
  ) {}

  public ngOnInit(): void {
    this.searchFlyForm = this.fb.group({
      from: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', Validators.required],
      departureReturnDate: [''],
    });
    this.airportService.getAllAirports();
  }

  public onClick() {
    if (this.searchFlyForm.valid) {
      this.requestInfo = { ...this.searchFlyForm.value, passengers: this.passengers };
      this.getUserRequestService.setUserRequestInfo(this.requestInfo);
      this.router.navigateByUrl('/booking');
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

  public getAirportDepartureNameForSelectHeader(text: string) {
    this.airportDepartureNameForSelectHeader = text;
  }

  public getAirportArrivalNameForSelectHeader(text: string) {
    this.airportArrivalNameForSelectHeader = text;
  }
}
