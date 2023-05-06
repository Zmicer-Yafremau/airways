import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new Subject<IUser>();

  public getUser(value: IUser) {
    this.user.next(value);
  }
}
