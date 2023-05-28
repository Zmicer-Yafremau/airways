import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import * as _ from 'lodash';
import { IPassengers, IPassengerContacts, IPassengerForm } from '../models/passenger-model';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  public passengers = new BehaviorSubject<IPassengers>({
    adults: undefined,
    children: undefined,
    infants: undefined,
  });

  public passengerContacts = new BehaviorSubject<IPassengerContacts>({
    countryCode: '+93',
    phone: '',
    mail: '',
    formIsValid: false,
  });

  public passengerForm = new BehaviorSubject<IPassengerForm>({
    id: 0,
    passengerType: 'adults',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    baggage: false,
    baggageAmount: 0,
    formIsValid: false,
  });

  public addPassengerContact(contact: IPassengerContacts) {
    this.passengerContacts.next(contact);
  }

  public addPassengers(passengers: IPassengers) {
    this.passengers.next(passengers);
  }

  public addPassengerForm(passengerForm: IPassengerForm) {
    this.passengers.pipe(take(1)).subscribe((passengers) => {
      const newPassengers = _.cloneDeep(passengers) as IPassengers;
      if (newPassengers[passengerForm.passengerType]) {
          (newPassengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id] =
          passengerForm;
      } else if (passengerForm.id) {
        const passengerMock = [];
        for (let i = 0; i < passengerForm.id + 1; i += 1) {
          if (i === passengerForm.id) {
            passengerMock.push(passengerForm);
          } else {
            passengerMock.push({
              id: i,
              passengerType: passengerForm.passengerType,
              firstName: '',
              lastName: '',
              gender: '',
              dateOfBirth: '',
              baggage: false,
              baggageAmount: 0,
              formIsValid: false,
            });
          }
        }
        (newPassengers[passengerForm.passengerType] as [IPassengerForm]) = passengerMock as [
          IPassengerForm,
        ];
      } else (newPassengers[passengerForm.passengerType] as [IPassengerForm]) = [passengerForm];
      this.addPassengers(newPassengers);
    });
  }
}
