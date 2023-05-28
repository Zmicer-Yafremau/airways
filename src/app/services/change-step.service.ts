import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISteps } from '../types/ISteps';
import { PassengerService } from './passenger.service';
import { passengerFormsAreValid } from '../shared/validators/passengerFormValidator';

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
    if (localStorage.getItem('passengersContact') &&
    localStorage.getItem('passengersInfo')) {
      this.changeButtonStatus(false);
    } else if (!(localStorage.getItem('passengersContact') &&
    localStorage.getItem('passengersInfo'))) {
      this.changeButtonStatus(true);
    }                   
    this.progressCondition$.subscribe((condition) => {
      const passengerServiceId = this.passengerService.passengers.subscribe((passengers) => {
        if (condition.passengers === 'active') {
          this.passengerService.passengerContacts.subscribe((contacts) => {
            if (passengerFormsAreValid(passengers, contacts)) {
              localStorage.setItem('passengersContact', JSON.stringify(contacts));
              localStorage.setItem('passengersInfo', JSON.stringify(passengers));
              this.changeButtonStatus(false);
            } else if (!(passengerFormsAreValid(passengers, contacts))) {
              localStorage.setItem('passengersContact','');
              localStorage.setItem('passengersInfo', '');
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
