import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IPassengerForm, IPassengers } from 'src/app/models/passenger-model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IFlightInfo } from 'src/app/types/IFlightInfo';
import { LocalStorageKeyEnum } from 'src/app/types/LocalStorageValue';
import { getTimeZone } from 'src/app/utils/booking/getTimeZone';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Output() public summaryPassengersInfo = new EventEmitter();

  @Input() public flight?: IFlightInfo;

  @Input() public passengers?: IPassengers;

  @Input() public isBack = false;

  public passengersInfo: IPassengerForm[] = [];

  public seats: string[] = [];

  public constructor(private ls: LocalStorageService) {}

  public ngOnInit() {
    const lsValue = this.ls.getValue(LocalStorageKeyEnum.PASSENGERS);

    if (!this.passengers?.adults?.length && lsValue) {
      this.passengers = JSON.parse(lsValue);
    }

    if (this.passengers?.adults?.length) {
      this.passengersInfo = [
        ...this.passengers.adults,
        ...(this.passengers.children || []),
        ...(this.passengers.infants || []),
      ];
      this.setSeats(this.passengersInfo.length);

      this.summaryPassengersInfo.emit({
        passengers: this.passengersInfo.map((el, i) => ({ ...el, seat: this.seats[i] })),
        type: this.isBack ? 'back' : 'forward',
      });
    }
  }

  public timezone(zone: string) {
    return getTimeZone(zone);
  }

  public setSeats(n: number) {
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    let row = Math.ceil(Math.random() * 24);

    let index = -1;

    this.seats = new Array(n).fill(0).map(() => {
      index += 1;
      if (index > 5) {
        index = 0;
        row += 1;
      }

      if (row > 24) {
        row = 1;
      }

      return row + seatLetters[index];
    });
  }
}
