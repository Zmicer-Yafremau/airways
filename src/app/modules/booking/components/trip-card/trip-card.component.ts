import { Component, Input } from '@angular/core';
import { IFlightInfo } from 'src/app/types/IFlightInfo';
import { getTimeZone } from 'src/app/utils/booking/getTimeZone';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  @Input() public flight?: IFlightInfo;

  public timezone(zone: string) {
    return getTimeZone(zone);
  }
}
