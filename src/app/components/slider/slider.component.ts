import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { strToDate } from 'src/app/utils/strToDate';

interface IFlights {
  date: Date;
  price: number | undefined;
  places: number | undefined;
  id: number | undefined;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Output() private changeSelection = new EventEmitter();

  @Input() private date = '13.05.2023';

  @Input() private flights = [
    {
      date: '11.05.2023',
      price: 100,
      places: 3,
      id: 1,
    },
    {
      date: '12.05.2023',
      price: 200,
      places: 20,
      id: 2,
    },
    {
      date: '13.05.2023',
      price: 300,
      places: 19,
      id: 3,
    },
    {
      date: '14.05.2023',
      price: 400,
      places: 15,
      id: 4,
    },
    {
      date: '15.05.2023',
      price: 500,
      places: 7,
      id: 5,
    },
  ];

  private flightsInfoList: IFlights[] = [];

  public checkedDate = strToDate(this.date);

  public flightsInfo$ = new BehaviorSubject<IFlights[]>([]);

  public ngOnInit() {
    this.findFlights();
  }

  private findFlights() {
    const date = new Date(this.checkedDate);
    date.setDate(date.getDate() - 4);
    this.flightsInfoList = Array.from(Array(7).keys()).map(() => {
      const elementDate = new Date(date.setDate(date.getDate() + 1));
      const flight = this.findItem(elementDate);

      return {
        date: elementDate,
        places: flight?.places,
        price: flight?.price,
        id: flight?.id,
      };
    });

    this.flightsInfo$.next(this.flightsInfoList);
  }

  private findItem(date: Date) {
    return this.flights.find((element) => strToDate(element.date).getTime() === date.getTime());
  }

  public moveSlider(step: number) {
    const lastDate = new Date(
      step > 0
        ? this.flightsInfoList[this.flightsInfoList.length - 1].date
        : this.flightsInfoList[0].date,
    );

    const newDate = new Date(lastDate.setDate(lastDate.getDate() + step));

    const item = this.findItem(newDate);

    const newFlight = { date: newDate, price: item?.price, id: item?.price, places: item?.places };

    this.flightsInfoList =
      step > 0
        ? [...this.flightsInfoList.slice(1), newFlight]
        : [newFlight, ...this.flightsInfoList.slice(0, this.flightsInfoList.length - 1)];

    this.flightsInfo$.next(this.flightsInfoList);
  }

  public onChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.checkedDate =
      this.flightsInfoList.find((el) => el.id === +element.value)?.date || this.checkedDate;

    this.changeSelection.emit(this.checkedDate);
  }
}
