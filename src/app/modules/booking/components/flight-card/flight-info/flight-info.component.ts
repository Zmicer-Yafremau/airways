import { Component, Input, OnInit } from '@angular/core';
import { ITimeInfo } from '../../../../../types/IFlightInfo';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {
  @Input() public isArrival = false;

  @Input() public timeInfo?: ITimeInfo;

  public timezone = '+0000';

  public ngOnInit(): void {
    if (this.timeInfo) {
      const [sign, ...timezoneLetters] = this.timeInfo.timezone.split('');
      const [firstNum, lastNum] = timezoneLetters.join('').split('.');

      const first = firstNum.length === 1 ? `0${firstNum}` : firstNum;
      const last = lastNum.length === 1 ? `${lastNum}0` : lastNum;

      this.timezone = sign + first + last;
    }
  }
}
