import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserRequestInfo } from '../types/IUserRequestInfo';

@Injectable({
  providedIn: 'root',
})
export class GetUserRequestInfoService {
  private userRequestInfo$ = new BehaviorSubject<IUserRequestInfo | null>(null);

  public setUserRequestInfo(value: IUserRequestInfo) {
    this.userRequestInfo$.next(value);
  }

  public getUserRequestInfo() {
    return this.userRequestInfo$.asObservable();
  }
}
