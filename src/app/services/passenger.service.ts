import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPassengers, IPassengerContacts } from '../models/passenger-model';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  public passengers = new BehaviorSubject<IPassengers>({
    adults: [
      {
        id: 0,
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        needAssistance: false,
        formIsValid: false,
      },
    ],
    children: [
      { 
        id: 0,
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        needAssistance: false,
        formIsValid: false,
      },
    ],
    infants: [
      {
        id: 0,
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        formIsValid: false,
      },
    ],
  });

  public passengerContacts = new BehaviorSubject<IPassengerContacts>({
    countryCode: '',
    phone: '',
    mail: '',
    formIsValid: false,
  });

  public constructor() {}

  public addPassengerContact(contact: IPassengerContacts) {
    this.passengerContacts.next(contact);
  }

  public addPassengers ( passengers: IPassengers) {
    this.passengers.next(passengers);
  }

}
