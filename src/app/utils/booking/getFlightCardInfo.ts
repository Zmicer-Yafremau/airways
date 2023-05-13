import { IFlight, IFlights } from 'src/app/types/IFlights';
import { IFlightInfo, ITimeInfo } from 'src/app/types/IFlightInfo';

const getTimeInfo = (info: IFlights | IFlight, key: 'form' | 'to'): ITimeInfo => ({
  date: new Date(key === 'form' ? info.takeoffDate : info.landingDate),
  timezone: info[key].gmt,
  airport: info[key].name,
});

export const getFlightCardInfo = (info: IFlights | IFlight): IFlightInfo => {
  const departureTimeInfo = getTimeInfo(info, 'form');
  const arrivalTimeInfo = getTimeInfo(info, 'to');

  return {
    departureTimeInfo,
    arrivalTimeInfo,
    flightTime: info.timeMins,
    flightNumber: info.flightNumber,
    seats: info.seats.avaible,
    price: info.price,
  };
};
