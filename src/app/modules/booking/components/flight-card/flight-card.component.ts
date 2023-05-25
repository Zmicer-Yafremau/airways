import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { FlightInfoService } from 'src/app/services/flight-info.service';
import { IFlightInfo } from '../../../../types/IFlightInfo';

@UntilDestroy()
@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit, OnChanges {
  private key?: 'back' | 'forward';

  @Input() public showSlider = true;

  @Output() public showSliderChange = new EventEmitter<boolean>();

  @Input() public isBack = false;

  @Input() public flightInfo?: IFlightInfo;

  public flightTime?: string;

  public currency: Currency = 'eur';

  public seats$ = new BehaviorSubject(0);

  public constructor(
    private dateCurrencyFormatService: GetDateCurrencyFormatService,
    private flightInfoService: FlightInfoService,
  ) {}

  public ngOnInit() {
    this.key = this.isBack ? 'back' : 'forward';
    this.flightInfoService.changeFieldState(false, this.key);

    this.flightTime = this.getFlightTime();

    this.dateCurrencyFormatService.dateCurrencyFormat$
      .pipe(untilDestroyed(this))
      .subscribe(({ currency }) => {
        this.currency = currency as Currency;
      });
  }

  public ngOnChanges({ flightInfo }: SimpleChanges) {
    if (flightInfo && this.key) {
      this.flightInfoService.changeFieldState(false, this.key);
      this.seats$.next(this.flightInfo?.seats || 0);
    }
  }

  public onClick() {
    this.showSlider = !this.showSlider;
    this.showSliderChange.emit(this.showSlider);
    if (this.flightInfo && this.key) {
      this.flightInfoService.setUserFlightInfo(this.flightInfo, this.key);
      this.flightInfoService.changeFieldState(!this.showSlider, this.key);
    }
  }

  private getFlightTime(): string {
    const mins = this.flightInfo?.flightTime;

    if (mins) {
      const hours = mins < 59 ? 0 : Math.floor(mins / 60);
      const minutes = mins - 60 * hours;

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
