export interface IPassengers {
  adults: [IPassengerForm];
  children: [IPassengerForm];
  infants: [IPassengerForm];
}

export interface IPassengerForm {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  disabled?: boolean;
  formIsValid: boolean;
}
export interface IPassengerContacts {
    countryCode: string;
    phone: string;
    mail: string;
    formIsValid: boolean;
}