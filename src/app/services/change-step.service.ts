import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { ISteps } from '../types/ISteps';
import { PassengerService } from './passenger.service';

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

  public constructor(public passengerService: PassengerService) {
    this.progressCondition$.subscribe((condition) => {
      const passengerServiceId = this.passengerService.passengers.subscribe((passengers) => {
        if (condition.passengers === 'active') {
          const passClone = _.cloneDeep(passengers);
          this.passengerService.passengerContacts.subscribe((contacts) => {
            const passengerFormsStatus = Object.values(passClone)
              .flat(Infinity)
              .filter((el) => el)
              .map((pasArr) => pasArr.formIsValid)
              .every((isValid) => isValid);
            const passengerContactFormStatus = contacts.formIsValid;
            if (passengerFormsStatus && passengerContactFormStatus) {
              this.changeButtonStatus(false);
            } else if (!(passengerFormsStatus && passengerContactFormStatus)) {
              this.changeButtonStatus(true);
            }
          });
        }
      });

      if (condition.passengers !== 'active') {
        passengerServiceId.unsubscribe();
      }
    });
  }

  public changeStep(value: ISteps) {
    this.continueButtonStatus$.next(false);
    this.progressCondition$.next(value);
  }

  public changeButtonStatus(value: boolean) {
    this.continueButtonStatus$.next(value);
  }
}
