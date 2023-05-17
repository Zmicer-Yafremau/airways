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
  public continueButtonStatus$ = new BehaviorSubject<boolean>(false);

  public changeStep(value: ISteps) {
    this.continueButtonStatus$.next(false);
    this.progressCondition$.next(value);
  }
  
  public changeButtonStatus(value: boolean){
    this.continueButtonStatus$.next(value);
  }

}
