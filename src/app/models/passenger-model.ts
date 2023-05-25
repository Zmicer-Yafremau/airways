export interface IPassengers {
  adults?: [IPassengerForm];
  children?: [IPassengerForm];
  infants?: [IPassengerForm];
}

export interface IPassengerForm {
  id: number;
  passengerType: PassengerType;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  needAssistance?: boolean;
  formIsValid: boolean;
}
export interface IPassengerContacts {
  countryCode: string;
  phone: string;
  mail: string;
  formIsValid: boolean;
}
export type PassengerType = 'adults' | 'children' | 'infants';

