import { IPrice } from 'src/app/types/IFlights';
import { IPassengers } from 'src/app/types/IPassengerConfig';

export const getSummaryPrice = (
  one: {
    adults: number;
    children: number;
    infants: number;
  },
  quantity: IPassengers,
) =>
  one.adults * quantity.adults + one.children * quantity.children + one.infants * quantity.infants;

export const getPrice = (forwardPrice: number, backPrice?: number) => {
  const price = Math.floor(backPrice ? forwardPrice + backPrice : forwardPrice);

  return {
    adults: price,
    children: price * 0.7,
    infants: price * 0.5,
  };
};

export const getSum = (quantity: IPassengers, forwardPrice: IPrice, backPrice?: IPrice) => {
  const price = {
    eur: getPrice(forwardPrice.eur, backPrice?.eur),
    usd: getPrice(forwardPrice.usd, backPrice?.usd),
    pln: getPrice(forwardPrice.pln, backPrice?.pln),
    rub: getPrice(forwardPrice.rub, backPrice?.rub),
  };

  return {
    eur: getSummaryPrice(price.eur, quantity),
    usd: getSummaryPrice(price.usd, quantity),
    pln: getSummaryPrice(price.pln, quantity),
    rub: getSummaryPrice(price.rub, quantity),
  };
};
