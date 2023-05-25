import { Component, Input, OnInit } from '@angular/core';
import { getTimeZone } from 'src/app/utils/booking/getTimeZone';
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
      this.timezone = getTimeZone(this.timeInfo.timezone);
    }
  }
}
