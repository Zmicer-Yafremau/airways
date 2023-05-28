export enum PassengersTypeEnum {
  ADULTS = 'Adult',
  CHILDREN = 'Child',
  INFANTS = 'Infant',
  LUGGAGE = 'Extra luggage',
}

export interface IPassengerConfig {
  adults: IPassengerText;
  children: IPassengerText;
  infants: IPassengerText;
}

export interface IPassengerText {
  key: 'adults' | 'children' | 'infants';
  title: 'Adult' | 'Child' | 'Infant';
  age: string;
}

export interface IPassengers extends Record<string, number> {
  adults: number;
  children: number;
  infants: number;
  sum: number;
}
