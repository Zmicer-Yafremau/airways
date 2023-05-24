import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPassengers, IPassengerContacts, IPassengerForm } from '../models/passenger-model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PassengerService implements OnInit {
  public passengers = new BehaviorSubject<IPassengers>({
    adults: undefined,
    children: undefined,
    infants: undefined,
  });

  public passengerContacts = new BehaviorSubject<IPassengerContacts>({
    countryCode: '',
    phone: '',
    mail: '',
    formIsValid: false,
  });

  public passengerForm = new BehaviorSubject<IPassengerForm>({
    id: 0,
    passengerType: 'adults',
    firstName: '',
    lastName: '',
    gender: 'male',
    dateOfBirth: '',
    needAssistance: false,
    formIsValid: false,
  });

  public constructor() {}

  public ngOnInit(): void {
    console.log('hello from passengers');
  }

  public addPassengerContact(contact: IPassengerContacts) {
    this.passengerContacts.next(contact);
  }

  public addPassengers(passengers: IPassengers) {
    this.passengers.next(passengers);
  }

  public addPassengerForm(passengerForm: IPassengerForm) {
    // console.log('service');
    const id = this.passengers.subscribe((passengers) => {
      const newPassengers = _.cloneDeep(passengers) as IPassengers;
      // console.log('pass');
      // console.log('1', passengerForm);
      // console.log('2', newPassengers);
      // console.log('3', newPassengers[passengerForm.passengerType]);
      if (newPassengers[passengerForm.passengerType]) {
        if (
          JSON.stringify({ ...passengerForm }) ===
          JSON.stringify(
            (newPassengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id],
          )
        ) {
          // console.log('from if');
          id.unsubscribe();
        }
      }
      // console.log('from ex else');
      if (newPassengers[passengerForm.passengerType]) {
        (newPassengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id] =
          passengerForm;
      } else {
        (newPassengers[passengerForm.passengerType] as [IPassengerForm]) = [passengerForm];
      }
      // console.log('else', newPassengers);
      this.addPassengers(newPassengers);
    });
    // console.log('----------------------');
  }
}
