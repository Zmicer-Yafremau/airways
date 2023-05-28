import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { FlightInfoService } from 'src/app/services/flight-info.service';
import { ShowEditService } from 'src/app/services/show-edit.service';

enum Step {
  Flights = 'flights',
  Passengers = 'passengers',
  Review = 'review',
}
@Component({
  selector: 'app-booking-flow',
  templateUrl: './booking-flow.component.html',
  styleUrls: ['./booking-flow.component.scss'],
})
export class BookingFlowComponent implements OnInit {
  public step = Step.Flights;

  public isFlightsBtnValid = this.flightInfoService.getFieldsState();

  public stepEnum = Step;

  public continueButtonStatus!: boolean;

  public constructor(
    private stepService: ChangeStepService,
    public router: Router,
    private editService: ShowEditService,
    private flightInfoService: FlightInfoService,
    private toast: ToastService,
  ) {}

  public ngOnInit(): void {
    this.stepService.continueButtonStatus$.subscribe((status) => {
      this.continueButtonStatus = status;
    });
  }

  public stepForward() {
    if (this.step === Step.Flights) {
      this.step = Step.Passengers;
      this.router.navigateByUrl(`booking/step/${this.step}`);
      this.stepService.changeStep({
        flights: 'done',
        passengers: 'active',
        review: 'inactive',
      });
      return this.step;
    }
    if (this.step === Step.Passengers) {
      this.step = Step.Review;
      this.router.navigateByUrl(`booking/step/${this.step}`);
      this.stepService.changeStep({
        flights: 'done',
        passengers: 'done',
        review: 'active',
      });
      this.stepService.changeButtonStatus(true);
      return this.step;
    }
    if (this.step === Step.Review) {
      this.stepService.changeStep({
        flights: 'done',
        passengers: 'done',
        review: 'active',
      });
      return this.step;
    }
    console.log(this.step);
    return this.step;
  }

  public stepBack() {
    this.editService.isEditActive$.next(false);
    if (this.step === Step.Review) {
      this.step = Step.Passengers;
      this.router.navigateByUrl(`booking/step/${this.step}`);
      this.stepService.changeStep({
        flights: 'done',
        passengers: 'active',
        review: 'inactive',
      });
      return this.step;
    }
    if (this.step === Step.Passengers) {
      this.step = Step.Flights;
      this.router.navigateByUrl(`booking/step/${this.step}`);
      this.stepService.changeStep({
        flights: 'active',
        passengers: 'inactive',
        review: 'inactive',
      });
      return this.step;
    }
    if (this.step === Step.Flights) {
      this.router.navigateByUrl('');
    }
    return this.step;
  }

  public onBuyClick() {
    this.toast.success('You order is successfully paid');
    this.router.navigateByUrl('/');
  }
}
