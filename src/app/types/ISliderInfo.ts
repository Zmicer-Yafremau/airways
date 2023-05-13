import { IPrice } from './IFlights';

export interface ISliderInfo {
  id: string;
  takeoffDate: Date;
  price: IPrice;
  seats: number;
}
