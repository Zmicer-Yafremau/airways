import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap, tap } from 'rxjs';
import { FlightInfoService } from 'src/app/services/flight-info.service';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { PassengersTypeEnum } from 'src/app/types/IPassengerConfig';

export interface IPassengerPrice {
  adults: number;
  children: number;
  infants: number;
}

const getPrice = (forwardPrice: number, backPrice?: number) => {
  const price = Math.floor(backPrice ? forwardPrice + backPrice : forwardPrice);

  return {
    adults: price,
    children: price * 0.7,
    infants: price * 0.5,
  };
};

@UntilDestroy()
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  public currency: Currency = 'eur';

  public flight$ = this.flightInfo.getUserFlightInfo();

  public passengers$ = this.userInfo.getUserRequestInfo();

  public passengerPrice?: IPassengerPrice;

  public typeEnum = PassengersTypeEnum;

  public constructor(
    private flightInfo: FlightInfoService,
    private userInfo: GetUserRequestInfoService,
    private dateCurrency: GetDateCurrencyFormatService,
  ) {}

  public ngOnInit(): void {
    this.dateCurrency.dateCurrencyFormat$
      .pipe(
        untilDestroyed(this),
        tap(({ currency }) => {
          this.currency = currency as Currency;
        }),
        mergeMap(() => this.flight$),
        tap((flight) => {
          if (flight && flight.forward) {
            const forwardPrice = flight?.forward?.price[this.currency];
            const backPrice = flight?.back ? flight.back.price[this.currency] : undefined;
            this.passengerPrice = getPrice(forwardPrice, backPrice);
          }
        }),
      )
      .subscribe();
  }
}
