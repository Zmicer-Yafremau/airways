import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<IUser>({
    firtsName: '',
    lastName: '',
    email: '',
  });

  public setUser(value: IUser) {
    this.user.next(value);
  }
}
