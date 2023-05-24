import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISteps } from '../types/ISteps';
import { PassengerService } from './passenger.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ChangeStepService implements OnInit {
  public progressCondition$ = new BehaviorSubject<ISteps>({
    flights: 'active',
    passengers: 'inactive',
    review: 'inactive',
  });

  public continueButtonStatus$ = new BehaviorSubject<boolean>(false);

  constructor(public passengerService: PassengerService) {
    this.passengerService.passengers.subscribe((passengers) => {
      // console.log('from step', passengers);
      const passClone = _.cloneDeep(passengers);
      this.passengerService.passengerContacts.subscribe((contacts) => {
        // console.log('contacts!!!');
        const passengerFormsStatus = Object.values(passClone)
          .flat(Infinity)
          .filter((el)=>el)
          .map((pasArr) => {
            return pasArr.formIsValid;
          })
          .every((isValid) => {
            return isValid;
          });
        const passengerContactFormStatus = contacts.formIsValid;
        // console.log(passengerContactFormStatus);
        this.continueButtonStatus$.subscribe((status) => {
          // console.log('form serv');
          // console.log(status);
          // console.log(passengerContactFormStatus);
          // console.log(passengerFormsStatus);
          // console.log(passClone);
          if (status && passengerFormsStatus && passengerContactFormStatus)
            this.changeButtonStatus(false);
        });
      });
    });
  }

  public ngOnInit(): void {
  }

  public changeStep(value: ISteps) {
    this.continueButtonStatus$.next(false);
    this.progressCondition$.next(value);
  }

  public changeButtonStatus(value: boolean) {
    this.continueButtonStatus$.next(value);
  }
}
