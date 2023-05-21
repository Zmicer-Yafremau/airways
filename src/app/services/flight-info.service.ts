import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IFlights } from '../types/IFlights';
import { ENDPOINTS } from '../config/endpoints';
import { IFlightInfo, IUserFlightInfo, Key } from '../types/IFlightInfo';

export interface RequestBody {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlightInfoService {
  private flightInfo$ = new Subject<[IFlights, IFlights]>();

  private userFlightInfo$ = new BehaviorSubject<null | IUserFlightInfo>(null);

  private userFlightInfo: null | IUserFlightInfo = null;

  public constructor(private http: HttpClient) {}

  public getFlightInfo() {
    return this.flightInfo$.asObservable();
  }

  public requestFlightInfo(body: RequestBody) {
    this.http.post<[IFlights, IFlights]>(ENDPOINTS.flight, body).subscribe((content) => {
      this.flightInfo$.next(content);
    });
  }

  public setUserFlightInfo(value: IFlightInfo, key: Key) {
    this.userFlightInfo = this.userFlightInfo
      ? { ...this.userFlightInfo, [key]: value }
      : { [key]: value };

    this.userFlightInfo$.next(this.userFlightInfo);

    console.log('this.userFlightInfo', this.userFlightInfo);
  }
}
