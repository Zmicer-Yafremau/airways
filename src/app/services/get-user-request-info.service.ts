import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserRequestInfo } from '../types/IUserRequestInfo';

@Injectable({
  providedIn: 'root',
})
export class GetUserRequestInfoService {
  public userRequestInfo = new BehaviorSubject<IUserRequestInfo>({
    departureDate: '',
    departureReturnDate: '',
    destination: '',
    from: '',
    passengers: {
      adults: 0,
      children: 0,
      infants: 0,
      sum: 0,
    },
  });

  public setUserRequestInfo(value: IUserRequestInfo) {
    this.userRequestInfo.next(value);
  }
}
