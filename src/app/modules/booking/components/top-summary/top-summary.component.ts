import { Component } from '@angular/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { ShowEditService } from 'src/app/services/show-edit.service';

@Component({
  selector: 'app-top-summary',
  templateUrl: './top-summary.component.html',
  styleUrls: ['./top-summary.component.scss'],
})
export class TopSummaryComponent {
  public edit$ = this.editService.isEditActive$;

  public constructor(
    public getUserRequestService: GetUserRequestInfoService,
    public stepService: ChangeStepService,
    public editService: ShowEditService,
  ) {}

  public departureAirport = this.getUserRequestService.userRequestInfo.value.from;

  public arrivalAirport = this.getUserRequestService.userRequestInfo.value.destination;

  public tripType = this.getUserRequestService.userRequestInfo.value.departureReturnDate
    ? 'round'
    : 'oneway';

  public departureDate = this.getUserRequestService.userRequestInfo.value.departureDate;

  public departureReturnDate = this.getUserRequestService.userRequestInfo.value.departureReturnDate;

  public sumPassengers = this.getUserRequestService.userRequestInfo.value.passengers.sum;

  public step = '';

  public stepSubscription = this.stepService.progressCondition$.subscribe((step) => {
    this.step = step.flights;
  });

  public editClick() {
    this.editService.toggleEdit();
  }
}
