import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISteps } from '../types/ISteps';

@Injectable({
  providedIn: 'root',
})
export class ChangeStepService {
  public progressCondition$ = new BehaviorSubject<ISteps>({
    flights: 'active',
    passengers: 'inactive',
    review: 'inactive',
  });

  public changeStep(value: ISteps) {
    this.progressCondition$.next(value);
  }
}
