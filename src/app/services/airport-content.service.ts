import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IAirportsResponse } from '../types/IAirportsResponse';
import { ENDPOINTS } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AirportContentService {
  public constructor(private http: HttpClient) {}

  public airports$ = new BehaviorSubject<IAirportsResponse[]>([]);

  public getAllAirports() {
    this.http
      .get<IAirportsResponse[]>(ENDPOINTS.allAirports)
      .pipe(
        tap((airports) => {
          this.airports$.next(airports);
        }),
      )
      .subscribe();
  }
}
