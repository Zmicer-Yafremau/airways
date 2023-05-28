import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, mergeMap, tap } from 'rxjs';
import { FlightInfoService } from 'src/app/services/flight-info.service';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { SummaryService } from 'src/app/services/summary.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { PassengersTypeEnum } from 'src/app/types/IPassengerConfig';
import { IPassengerFormExtended, IPassengersPersonalInfo, ISummary } from 'src/app/types/Summary';
import { getPrice, getSum } from 'src/app/utils/booking/getPrice';

export interface IPassengerPrice {
  adults: number;
  children: number;
  infants: number;
}

@UntilDestroy()
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  public currency: Currency = 'eur';

  public flight$ = this.flightInfo.getUserFlightInfo();

  public passengers$ = this.userInfo.getUserRequestInfo();

  public passengerPrice?: IPassengerPrice;

  public typeEnum = PassengersTypeEnum;

  public passengersInfo$ = this.passengerService.passengers;

  public extraBaggage = {
    eur: 10,
    usd: 11,
    pln: 45,
    rub: 90,
  };

  private passengersPersonalInfo?: IPassengersPersonalInfo;

  public summaryInfo?: ISummary;

  public constructor(
    private flightInfo: FlightInfoService,
    private userInfo: GetUserRequestInfoService,
    private dateCurrency: GetDateCurrencyFormatService,
    private passengerService: PassengerService,
    private summaryService: SummaryService,
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

  public ngOnDestroy(): void {
    if (this.summaryInfo) {
      this.summaryService.setSummaryInfo(this.summaryInfo);
    }
  }

  private setSummaryInfo() {
    combineLatest([this.flight$, this.passengers$, this.passengersInfo$])
      .pipe(
        tap(([flight, passengers, passengersInfo]) => {
          const quantity = passengers?.passengers;
          const tripType = passengers?.roundTrip ? 'round' : 'one way';
          const back = flight?.back ? flight?.back : undefined;

          const adultsLuggage =
            passengersInfo.adults?.reduce((acc, el) => acc + el.baggageAmount, 0) || 0;
          const childrenLuggage =
            passengersInfo.children?.reduce((acc, el) => acc + el.baggageAmount, 0) || 0;
          const infantsLuggage =
            passengersInfo.infants?.reduce((acc, el) => acc + el.baggageAmount, 0) || 0;

          const extraLuggage = adultsLuggage + childrenLuggage + infantsLuggage;

          const extraLuggagePrice = {
            eur: this.extraBaggage.eur * extraLuggage,
            usd: this.extraBaggage.usd * extraLuggage,
            pln: this.extraBaggage.pln * extraLuggage,
            rub: this.extraBaggage.rub * extraLuggage,
          };

          if (flight?.forward && quantity && this.passengersPersonalInfo) {
            const sum = getSum(quantity, flight?.forward?.price, flight?.back?.price);

            const totalSum = {
              eur: extraLuggagePrice.eur + sum.eur,
              usd: extraLuggagePrice.usd + sum.usd,
              pln: extraLuggagePrice.pln + sum.pln,
              rub: extraLuggagePrice.rub + sum.rub,
            };

            this.summaryInfo = {
              passengersPersonalInfo: this.passengersPersonalInfo,
              quantity,
              tripType,
              forward: flight?.forward,
              back,
              totalSum,
              extraLuggage: {
                quantity: extraLuggage,
                price: extraLuggagePrice,
              },
            };
          }
        }),
      )
      .subscribe();
  }

  public onSummaryPassengersInfo({
    type,
    passengers,
  }: {
    type: 'back' | 'forward';
    passengers: IPassengerFormExtended[];
  }) {
    this.passengersPersonalInfo = { [type]: passengers };

    this.setSummaryInfo();
  }
}
