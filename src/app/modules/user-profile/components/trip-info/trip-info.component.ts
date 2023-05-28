import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CountTripService } from 'src/app/services/count-trip.service';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { SummaryService } from 'src/app/services/summary.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss'],
})
export class TripInfoComponent implements OnInit {
  public flightCode?: string;

  public from?: string;

  public destination?: string;

  public roundTrip?: string;

  public dateDeparture?: Date;

  public dateArrival?: Date;

  public passengers = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  public price?: number;

  public userCurrency: Currency = 'eur';

  public trips = 0;

  public constructor(
    private currencyService: GetDateCurrencyFormatService,
    public tripService: CountTripService,
    private summary: SummaryService,
  ) {}

  public ngOnInit(): void {
    this.tripService.getTrips().subscribe((value) => {
      this.trips = value;
    });

    this.summary.getSummaryInfo().subscribe((summary) => {
      if (summary) {
        this.flightCode = summary.forward.flightNumber;
        this.from = summary.forward.departureTimeInfo.city;
        this.destination = summary.forward.arrivalTimeInfo.city;
        this.roundTrip = summary.tripType;
        this.dateDeparture = summary.forward.departureTimeInfo.date;
        this.dateArrival = summary.back?.departureTimeInfo.date;
        this.passengers.adults = summary.quantity.adults;
        this.passengers.children = summary.quantity.children;
        this.passengers.infants = summary.quantity.infants;
        this.currencyService.dateCurrencyFormat$.subscribe((info) => {
          this.userCurrency = info.currency as Currency;
          this.price = summary.totalSum[this.userCurrency];
        });
      }
    });
  }

  public onCheck(e: MatCheckboxChange) {
    if (e.checked) this.tripService.changeTrip(this.trips + 1);
    if (!e.checked) this.tripService.changeTrip(this.trips - 1);
  }
}
