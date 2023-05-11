import { Component } from '@angular/core';
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
export class BookingFlowComponent {
  public step = Step.Flights;

  public constructor(private stepService: ChangeStepService, public router: Router) {}

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
