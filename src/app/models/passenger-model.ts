export interface IPassenger {
  adults: [IPassengerForm];
  children: [IPassengerForm];
  infants: [IPassengerForm];
}

export interface IPassengerForm {
  firstName: string;
  lastName: string;
  gender: string;
  date: string;
  disabled?: boolean;
}
export interface IPassengerContacts {
    code: string;
    phone: string;
    mail: string;
}