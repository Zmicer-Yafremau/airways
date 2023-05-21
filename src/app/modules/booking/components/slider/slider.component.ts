import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISliderInfo } from 'src/app/types/ISliderInfo';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { IPrice } from '../../../../types/IFlights';

interface IFlights {
  date: Date;
  price: IPrice | undefined;
  seats: number | undefined;
  id: string | undefined;
}

@UntilDestroy()
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  private flightsInfoList: IFlights[] = [];

  @Output() private changeSelection = new EventEmitter();

  @Input() public date = new Date();

  @Input() public flights: ISliderInfo[] = [];

  @Input() public type?: 'departure' | 'arrival';

  @Input() public showSlider = true;

  public currency: Currency = 'eur';

  public checkedDate = new Date();

  public flightsInfo$ = new BehaviorSubject<IFlights[]>([]);

  public constructor(private dateCurrencyFormatService: GetDateCurrencyFormatService) {}

  public ngOnInit() {
    this.findFlights();
    this.checkedDate = this.date;

    this.dateCurrencyFormatService.dateCurrencyFormat$
      .pipe(untilDestroyed(this))
      .subscribe(({ currency }) => {
        this.currency = currency as Currency;
      });
  }

  public moveSlider(step: number) {
    const lastDate = new Date(
      step > 0
        ? this.flightsInfoList[this.flightsInfoList.length - 1].date
        : this.flightsInfoList[0].date,
    );

    const newDate = new Date(lastDate.setDate(lastDate.getDate() + step));

    const item = this.findItem(newDate);

    const newFlight = { date: newDate, price: item?.price, id: item?.id, seats: item?.seats };

    this.flightsInfoList =
      step > 0
        ? [...this.flightsInfoList.slice(1), newFlight]
        : [newFlight, ...this.flightsInfoList.slice(0, this.flightsInfoList.length - 1)];

    this.flightsInfo$.next(this.flightsInfoList);
  }

  public onChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.checkedDate =
      this.flightsInfoList.find((el) => el.id === element.id)?.date || this.checkedDate;

    this.changeSelection.emit(element.id);
  }

  public getPureDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  private findFlights() {
    const date = new Date(this.date);
    date.setDate(date.getDate() - 4);

    this.flightsInfoList = Array.from(Array(7).keys()).map(() => {
      const elementDate = new Date(date.setDate(date.getDate() + 1));
      const flight = this.findItem(elementDate);
      return {
        date: elementDate,
        seats: flight?.seats,
        price: flight?.price,
        id: flight?.id,
      };
    });

    this.flightsInfo$.next(this.flightsInfoList);
  }

  private findItem(date: Date) {
    return this.flights.find(
      (element) => this.getPureDate(element.takeoffDate) === this.getPureDate(date),
    );
  }
}
