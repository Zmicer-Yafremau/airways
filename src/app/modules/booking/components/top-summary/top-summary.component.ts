import { Component, OnInit } from '@angular/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
<<<<<<< HEAD
import { ShowEditService } from 'src/app/services/show-edit.service';
=======
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LocalStorageKeyEnum } from 'src/app/types/LocalStorageValue';
import { IUserRequestInfo } from 'src/app/types/IUserRequestInfo';
>>>>>>> 5e9555d060a827ba3d9e4747b7f8c1973ebc395f

@UntilDestroy()
@Component({
  selector: 'app-top-summary',
  templateUrl: './top-summary.component.html',
  styleUrls: ['./top-summary.component.scss'],
})
<<<<<<< HEAD
export class TopSummaryComponent {
  public edit$ = this.editService.isEditActive$;

  public constructor(
    public getUserRequestService: GetUserRequestInfoService,
    public stepService: ChangeStepService,
    public editService: ShowEditService,
=======
export class TopSummaryComponent implements OnInit {
  public constructor(
    public getUserRequestService: GetUserRequestInfoService,
    public stepService: ChangeStepService,
    private localStorageService: LocalStorageService,
>>>>>>> 5e9555d060a827ba3d9e4747b7f8c1973ebc395f
  ) {}

  public departureAirport = '';

  public arrivalAirport = '';

  public tripType = '';

  public departureDate = '';

  public departureReturnDate = '';

  public sumPassengers = 0;

  public step = '';

<<<<<<< HEAD
  public stepSubscription = this.stepService.progressCondition$.subscribe((step) => {
    this.step = step.flights;
  });

  public editClick() {
    this.editService.toggleEdit();
=======
  public ngOnInit(): void {
    this.stepService.progressCondition$.pipe(untilDestroyed(this)).subscribe((step) => {
      this.step = step.flights;
    });

    this.getUserRequestService
      .getUserRequestInfo()
      .pipe(untilDestroyed(this))
      .subscribe((info) => {
        const lsValue = this.localStorageService.getValue(LocalStorageKeyEnum.TOP_SUMMARY);

        let content: IUserRequestInfo | null = null;

        if (info) {
          content = info;
        } else if (lsValue) {
          content = JSON.parse(lsValue);
        }

        if (content) {
          this.localStorageService.setValue({
            key: LocalStorageKeyEnum.TOP_SUMMARY,
            value: content,
          });

          this.departureAirport = content.from;

          this.arrivalAirport = content.destination;

          this.tripType = content.departureReturnDate ? 'round' : 'oneway';

          this.departureDate = content.departureDate;

          this.departureReturnDate = content.departureReturnDate;

          this.sumPassengers = content.passengers.sum;
        }
      });
>>>>>>> 5e9555d060a827ba3d9e4747b7f8c1973ebc395f
  }
}
