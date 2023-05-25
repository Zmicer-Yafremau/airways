import { Component, OnInit } from '@angular/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShowEditService } from 'src/app/services/show-edit.service';

@UntilDestroy()
@Component({
  selector: 'app-top-summary',
  templateUrl: './top-summary.component.html',
  styleUrls: ['./top-summary.component.scss'],
})
export class TopSummaryComponent implements OnInit {
  public constructor(
    public getUserRequestService: GetUserRequestInfoService,
    public stepService: ChangeStepService,
    private editService: ShowEditService,
  ) {}

  public departureAirport = '';

  public arrivalAirport = '';

  public tripType = '';

  public departureDate = '';

  public departureReturnDate = '';

  public sumPassengers = 0;

  public step = '';

  public ngOnInit(): void {
    this.stepService.progressCondition$.pipe(untilDestroyed(this)).subscribe((step) => {
      this.step = step.flights;
    });

    this.getUserRequestService
      .getUserRequestInfo()
      .pipe(untilDestroyed(this))
      .subscribe((content) => {
        if (content) {
          this.departureAirport = content.from;

          this.arrivalAirport = content.destination;

          this.tripType = content.departureReturnDate ? 'round' : 'oneway';

          this.departureDate = content.departureDate;

          this.departureReturnDate = content.departureReturnDate;

          this.sumPassengers = content.passengers.sum;
        }
      });
  }

  public editClick() {
    this.editService.toggleEdit();
  }
}
