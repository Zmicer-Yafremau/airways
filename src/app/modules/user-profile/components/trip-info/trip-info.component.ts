import { Component, OnInit } from '@angular/core';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss'],
})
export class TripInfoComponent implements OnInit {
  public flightCode = 'FR0013';

  public from?: string;

  public destination?: string;

  public roundTrip?: 'Round trip' | 'One way';

  public dateDeparture?: string;

  public dateArrival?: string;

  public passengers = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  public price = 666;

  public userCurrency?: string;

  public constructor(
    private infoService: GetUserRequestInfoService,
    private currencyService: GetDateCurrencyFormatService,
  ) {}

  public ngOnInit(): void {
    this.infoService.getUserRequestInfo().subscribe((info) => {
      if (info) {
        this.from = info.from;
        this.destination = info.destination;
        this.roundTrip = info.roundTrip ? 'Round trip' : 'One way';
        this.dateDeparture = info.departureDate;
        this.dateArrival = info.departureReturnDate;
        this.passengers.adults = info.passengers.adults;
        this.passengers.children = info.passengers.children;
        this.passengers.infants = info.passengers.infants;
      }
    });
    this.currencyService.dateCurrencyFormat$.subscribe((info) => {
      this.userCurrency = info.currency.toUpperCase();
    });
  }
}
