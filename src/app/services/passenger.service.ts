import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    gender: 'male',
    dateOfBirth: '',
    needAssistance: false,
    formIsValid: false,
  });

  public addPassengerContact(contact: IPassengerContacts) {
    localStorage.setItem('passengersContact', JSON.stringify(contact));
    this.passengerContacts.next(contact);
  }

  public addPassengers(passengers: IPassengers) {
    this.passengers.next(passengers);
  }

  public addPassengerForm(passengerForm: IPassengerForm) {
    const id = this.passengers.subscribe((passengers) => {
      const newPassengers = _.cloneDeep(passengers) as IPassengers;
      if (newPassengers[passengerForm.passengerType]) {
        if (
          JSON.stringify({ ...passengerForm }) ===
          JSON.stringify(
            (newPassengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id],
          )
        ) {
          localStorage.setItem('passengersInfo', JSON.stringify(passengers));
          id.unsubscribe();
        }
      }
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
              gender: 'male',
              dateOfBirth: '',
              needAssistance: false,
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
