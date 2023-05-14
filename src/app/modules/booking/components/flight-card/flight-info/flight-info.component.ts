import { Component, Input } from '@angular/core';
import { ITimeInfo } from '../../../../../types/IFlightInfo';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent {
  @Input() public isArrival = false;

  @Input() public timeInfo?: ITimeInfo;
}
