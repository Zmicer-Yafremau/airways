import { IFlights } from 'src/app/types/IFlights';
import { ISliderInfo } from 'src/app/types/ISliderInfo';

export const getSliderInfo = (info: IFlights): ISliderInfo[] => {
  const currentDateInfo: ISliderInfo = {
    id: info.flightNumber,
    takeoffDate: new Date(info.takeoffDate),
    price: info.price,
    seats: info.seats.avaible,
  };
  const otherDatesInfo = Object.values(info.otherFlights).map((flight) => ({
    id: flight.flightNumber,
    takeoffDate: new Date(flight.takeoffDate),
    price: flight.price,
    seats: flight.seats.avaible,
  }));

  return [currentDateInfo, ...otherDatesInfo];
};
