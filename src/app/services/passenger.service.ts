import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPassengers, IPassengerContacts, IPassengerForm } from '../models/passenger-model';

@Injectable({
  providedIn: 'root',
})
export class PassengerService implements OnInit {
  public passengers = new BehaviorSubject<IPassengers>({
    adults: [
      {
        id: 0,
        passengerType: 'adults',
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        needAssistance: false,
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
    console.log('service',passengerForm);
    const id = this.passengers.subscribe((passengers) => {
      console.log(passengers);
      const serviceForm = JSON.stringify(
        (passengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id],
      );
      const ourForm = JSON.stringify(passengerForm);
      console.log(passengers);
      if (serviceForm === ourForm) id.unsubscribe();
      else {
        (passengers[passengerForm.passengerType] as [IPassengerForm])[passengerForm.id] =
          passengerForm;
        this.addPassengers(passengers);
      }
    });
  }
}
