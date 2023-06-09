import { IPrice } from './IFlights';

export interface ITimeInfo {
  date: Date;
  city: string;
  code: string;
  timezone: string;
  airport: string;
}

export interface IFlightInfo {
  departureTimeInfo: ITimeInfo;
  arrivalTimeInfo: ITimeInfo;
  flightTime: number;
  flightNumber: string;
  seats: number;
  price: IPrice;
}

export type Key = 'forward' | 'back';
export interface IUserFlightInfo {
  forward?: IFlightInfo;
  back?: IFlightInfo;
}

export interface RequestBody {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate: string;
}
