import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAirportsResponse } from '../types/IAirportsResponse';
import { ENDPOINTS } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AirportContentService {
  public constructor(private http: HttpClient) {}

  public airports$ = new BehaviorSubject<IAirportsResponse[]>([]);

  public getAllAirports() {
    this.http.get<IAirportsResponse[]>(ENDPOINTS.allAirports).subscribe((airports) => {
      this.airports$.next(airports);
    });
  }
}
