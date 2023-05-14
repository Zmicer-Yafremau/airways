interface Seats {
  total: number;
  avaible: number;
}

interface Airport {
  key: string;
  name: string;
  city: string;
  gmt: string;
  country: string;
}

export interface IPrice {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export interface IFlight {
  seats: Seats;
  flightNumber: string;
  timeMins: number;
  form: Airport;
  to: Airport;
  takeoffDate: string;
  landingDate: string;
  price: IPrice;
}

interface OtherFlights {
  [key: string]: IFlight;
}

export interface IFlights extends IFlight {
  otherFlights: OtherFlights;
}
