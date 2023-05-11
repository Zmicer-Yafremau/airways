import { Component } from '@angular/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { StepCondition } from 'src/app/types/ISteps';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent {
  public constructor(public stepService: ChangeStepService) {}

  public sFlight?: StepCondition;

  public sPassengers?: StepCondition;

  public sReview?: StepCondition;

  public step = this.stepService.progressCondition$.subscribe((step) => {
    this.sFlight = step.flights;
    this.sPassengers = step.passengers;
    this.sReview = step.review;
  });
}
