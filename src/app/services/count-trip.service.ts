import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountTripService {
  private trips$ = new BehaviorSubject<number>(0);

  public changeTrip(value: number) {
    this.trips$.next(value);
  }

  public getTrips() {
    return this.trips$.asObservable();
  }
}
