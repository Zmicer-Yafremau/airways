import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IFlights } from '../types/IFlights';
import { ENDPOINTS } from '../config/endpoints';
import { IFlightInfo, IUserFlightInfo, Key, RequestBody } from '../types/IFlightInfo';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeyEnum } from '../types/LocalStorageValue';

@Injectable({
  providedIn: 'root',
})
export class FlightInfoService {
  private flightInfo$ = new Subject<[IFlights, IFlights]>();

  private userFlightInfo$ = new BehaviorSubject<null | IUserFlightInfo>(null);

  private userFlightInfo: null | IUserFlightInfo = null;

  private fieldsState = {
    forward: false,
    back: false,
  };

  public isAllFieldsValid$ = new BehaviorSubject(false);

  public constructor(private http: HttpClient, private ls: LocalStorageService) {}

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

    this.ls.setValue({ key: LocalStorageKeyEnum.USER_FLIGHT_INFO, value: this.userFlightInfo });

    this.userFlightInfo$.next(this.userFlightInfo);
  }

  public getUserFlightInfo() {
    if (!this.userFlightInfo) {
      const userInfo = this.ls.getValue(LocalStorageKeyEnum.USER_FLIGHT_INFO);
      if (userInfo) {
        this.userFlightInfo = JSON.parse(userInfo);
        this.userFlightInfo$.next(this.userFlightInfo);
      }
    }

    return this.userFlightInfo$.asObservable();
  }

  public changeFieldState(value: boolean, key: Key) {
    this.fieldsState = { ...this.fieldsState, [key]: value };
    this.isAllFieldsValid$.next(Object.values(this.fieldsState).every((el) => el));
  }

  public getFieldsState() {
    return this.isAllFieldsValid$.asObservable();
  }
}
