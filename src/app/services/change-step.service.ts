import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISteps } from '../types/ISteps';
import { PassengerService } from './passenger.service';

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

  constructor(private passengerService: PassengerService) {}

  public ngOnInit(): void {
    this.passengerService.passengers.subscribe((passengers) => {
      this.passengerService.passengerContacts.subscribe((contacts) => {
        const passengerFormsStatus = Object.values(passengers)
          .map((pasArr) => pasArr.formIsValid)
          .every((isValid) => isValid);
        const passengerContactFormStatus = contacts.formIsValid;
        console.log(passengerContactFormStatus);
        console.log(passengerFormsStatus);
        this.continueButtonStatus$.subscribe((status) => {
          console.log('form serv');
          console.log(status);
          console.log(passengerContactFormStatus);
          console.log(passengerFormsStatus);
          if (status && passengerFormsStatus && passengerContactFormStatus)
            this.changeButtonStatus(false);
        });
      });
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
