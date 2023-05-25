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
        // console.log('serv',newPassengers);
        // console.log('value',passengerForm);
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
      // console.log('else', newPassengers);
      this.addPassengers(newPassengers);
    });
    // console.log('----------------------');
  }
}
