import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserRequestInfo } from '../types/IUserRequestInfo';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeyEnum } from '../types/LocalStorageValue';

@Injectable({
  providedIn: 'root',
})
export class GetUserRequestInfoService {
  private userRequestInfo$ = new BehaviorSubject<IUserRequestInfo | null>(null);

  private userRequestInfo: IUserRequestInfo | null = null;

  public constructor(private localStorageService: LocalStorageService) {}

  public setUserRequestInfo(value: IUserRequestInfo) {
    this.userRequestInfo$.next(value);
    this.userRequestInfo = value;
    this.localStorageService.setValue({
      key: LocalStorageKeyEnum.TOP_SUMMARY,
      value,
    });
  }

  public getUserRequestInfo() {
    if (!this.userRequestInfo) {
      const userInfo = this.localStorageService.getValue(LocalStorageKeyEnum.TOP_SUMMARY);
      if (userInfo) {
        this.userRequestInfo = JSON.parse(userInfo);
        this.userRequestInfo$.next(this.userRequestInfo);
      }
    }
    return this.userRequestInfo$.asObservable();
  }
}
