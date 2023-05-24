import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeStepService } from 'src/app/services/change-step.service';

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
export class BookingFlowComponent implements OnInit{
  public step = Step.Flights;

  public continueButtonStatus = false;

  public constructor(private stepService: ChangeStepService, public router: Router) {}

  public ngOnInit(): void {
    this.stepService.continueButtonStatus$.subscribe(status => this.continueButtonStatus = status);
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
      this.stepService.changeButtonStatus(false);
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
      this.stepService.changeButtonStatus(false);
      return this.step;
    }
    return this.step;
  }

  public stepBack() {
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
}
