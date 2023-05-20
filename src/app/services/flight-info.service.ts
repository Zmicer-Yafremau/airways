import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IFlights } from '../types/IFlights';
import { ENDPOINTS } from '../config/endpoints';

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

  public constructor(private http: HttpClient) {}

  public getFlightInfo() {
    return this.flightInfo$.asObservable();
  }

  public requestFlightInfo(body: RequestBody) {
    this.http.post<[IFlights, IFlights]>(ENDPOINTS.flight, body).subscribe((content) => {
      this.flightInfo$.next(content);
    });
  }
}
