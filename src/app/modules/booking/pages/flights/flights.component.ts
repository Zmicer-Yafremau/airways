import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlightInfoService } from 'src/app/services/flight-info.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IFlightInfo, RequestBody } from 'src/app/types/IFlightInfo';
import { IFlight, IFlights } from 'src/app/types/IFlights';
import { ISliderInfo } from 'src/app/types/ISliderInfo';
import { LocalStorageKeyEnum } from 'src/app/types/LocalStorageValue';
import { getFlightCardInfo } from 'src/app/utils/booking/getFlightCardInfo';
import { getSliderInfo } from 'src/app/utils/booking/getSliderInfo';

const getUTCDate = (value: string): string => {
  const date = new Date(value);
  const minutes = date.getTimezoneOffset();

  date.setMinutes(date.getMinutes() - minutes);

  return date.toISOString();
};

@UntilDestroy()
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  private allFlights: IFlight[] = [];

  public showArrivalSlider = true;

  public showDepartureSlider = true;

  public departureDate?: Date;

  public arrivalDate?: Date;

  public sliderDepartureInfo?: ISliderInfo[];

  public flightCardDepartureInfo?: IFlightInfo;

  public sliderArrivalInfo?: ISliderInfo[];

  public flightCardArrivalInfo?: IFlightInfo;

  public constructor(
    private userInfo: GetUserRequestInfoService,
    private flightInfo: FlightInfoService,
    private localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.userInfo
      .getUserRequestInfo()
      .pipe(untilDestroyed(this))
      .subscribe((content) => {
        const lsValue = this.localStorageService.getValue(LocalStorageKeyEnum.STEP_1);

        let body: RequestBody | null = null;
        console.log('1', content);

        if (content) {
          body = {
            fromKey: content.from,
            toKey: content.destination,
            forwardDate: getUTCDate(content.departureDate),
            backDate: content.departureReturnDate ? getUTCDate(content.departureReturnDate) : '',
          };

          this.localStorageService.setValue({
            key: LocalStorageKeyEnum.STEP_1,
            value: body,
          });
        } else if (lsValue) {
          body = JSON.parse(lsValue);
        }

        if (body) {
          this.flightInfo.requestFlightInfo(body);
        }
      });

    this.flightInfo
      .getFlightInfo()
      .pipe(untilDestroyed(this))
      .subscribe((content) => {
        console.log(content);

        if (content) {
          this.allFlights = this.getAllFlights(content);

          this.departureDate = new Date(content[0].takeoffDate);
          this.sliderDepartureInfo = getSliderInfo(content[0]);
          this.flightCardDepartureInfo = getFlightCardInfo(content[0]);

          if (content.length === 2) {
            this.arrivalDate = new Date(content[1].takeoffDate);
            this.sliderArrivalInfo = getSliderInfo(content[1]);
            this.flightCardArrivalInfo = getFlightCardInfo(content[1]);
          }
        }
      });
  }

  public changeDeparture(id: string): void {
    const flight = this.allFlights.find((el) => el.flightNumber === id);

    if (flight) {
      this.flightCardDepartureInfo = getFlightCardInfo(flight);
    }
  }

  public changeArrival(id: string): void {
    const flight = this.allFlights.find((el) => el.flightNumber === id);

    if (flight) {
      this.flightCardArrivalInfo = getFlightCardInfo(flight);
    }
  }

  public getAllFlights([departure, arrival]: [IFlights, IFlights]) {
    const { otherFlights: otherDepartureFlights, ...departureFlight } = departure;

    if (arrival) {
      const { otherFlights: otherArrivalFlights, ...arrivalFlight } = arrival;

      return [
        departureFlight,
        arrivalFlight,
        ...Object.values(otherDepartureFlights),
        ...Object.values(otherArrivalFlights),
      ];
    }

    return [departureFlight, ...Object.values(otherDepartureFlights)];
  }
}
