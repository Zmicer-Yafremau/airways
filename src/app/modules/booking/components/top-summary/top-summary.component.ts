import { Component } from '@angular/core';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';

@Component({
  selector: 'app-top-summary',
  templateUrl: './top-summary.component.html',
  styleUrls: ['./top-summary.component.scss'],
})
export class TopSummaryComponent {
  public constructor(public getUserRequestService: GetUserRequestInfoService) {}

  public departureAirport = this.getUserRequestService.userRequestInfo.value.from;

  public arrivalAirport = this.getUserRequestService.userRequestInfo.value.destination;

  public tripType = this.getUserRequestService.userRequestInfo.value.departureReturnDate
    ? 'round'
    : 'oneway';

  public departureDate = this.getUserRequestService.userRequestInfo.value.departureDate;

  public departureReturnDate = this.getUserRequestService.userRequestInfo.value.departureReturnDate;

  public sumPassengers = this.getUserRequestService.userRequestInfo.value.passengers.sum;
}
