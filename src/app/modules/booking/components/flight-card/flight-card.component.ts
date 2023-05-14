import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlightInfo } from '../../../../types/IFlightInfo';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit, OnChanges {
  @Input() public isBack = false;

  @Input() public flightInfo?: IFlightInfo;

  public flightTime?: string;

  public seats$ = new BehaviorSubject(0);

  public ngOnInit() {
    this.flightTime = this.getFlightTime();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['flightInfo']) {
      this.seats$.next(this.flightInfo?.seats || 0);
    }
  }

  private getFlightTime(): string {
    const mins = this.flightInfo?.flightTime;

    if (mins) {
      const hours = mins < 59 ? 0 : Math.floor(mins / 60);
      const minutes = mins - 60 * hours;

      console.log(hours, minutes);

      if (hours && minutes) {
        return `${hours}h ${this.getMinutes(minutes)}m`;
      }

      if (hours) {
        return `${hours}h`;
      }

      return `${this.getMinutes(minutes)}m`;
    }

    return '';
  }

  private getMinutes(minutes: number): string {
    if (minutes < 9) {
      return `0${minutes}`;
    }

    return minutes.toString();
  }
}
