import { IPassengers } from './IPassengerConfig';

export interface IUserRequestInfo {
  departureDate: string;
  departureReturnDate: string;
  destination: string;
  from: string;
  passengers: IPassengers;
}
