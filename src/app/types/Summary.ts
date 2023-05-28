import { IPassengerForm } from '../models/passenger-model';
import { IFlightInfo } from './IFlightInfo';
import { IPrice } from './IFlights';
import { IPassengers } from './IPassengerConfig';

export interface IPassengerFormExtended extends IPassengerForm {
  seat: string;
}

export interface IExtraLuggage {
  quantity: number;
  price: IPrice;
}

export interface IPassengersPersonalInfo {
  forward?: IPassengerFormExtended[];
  back?: IPassengerFormExtended[];
}

export interface ISummary {
  passengersPersonalInfo: IPassengersPersonalInfo;
  quantity: IPassengers;
  tripType: string;
  forward: IFlightInfo;
  back?: IFlightInfo;
  totalSum: IPrice;
  extraLuggage: IExtraLuggage;
}
