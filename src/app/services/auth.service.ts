import { Injectable } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { IRegUser, IToken, IUser } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<IUser>({
    firtsName: '',
    lastName: '',
    email: '',
  });

  public regUser = new BehaviorSubject<IRegUser>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    countryCode: '',
    phone: '',
    citizenship: '',
  });

  public url = 'https://api.air-ways.online';

  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public constructor(
    private httpClient: HttpClient,
    private toastService: ToastService,
    public dialog: MatDialog,
  ) {}

  public setUser(value: IUser) {
    this.user.next(value);
  }

  public getToken(value: IRegUser) {
    this.httpClient
      .post<IToken>(`${this.url  }/auth/registration`, JSON.stringify(value), {
        headers: this.headers,
      })
      .subscribe(
        (tokenObj) => {
          localStorage.setItem('token', `${tokenObj.token}`);
          this.dialog.closeAll();
          this.toastService.success('Success');
        },
        (error) => {
          if (error.message) {
            console.log(JSON.stringify(error.error.message));
            this.toastService.error(error.error.message);
          } else {
            console.log(JSON.stringify(error));
            this.toastService.error('Smth went wrong');
          }
        },
      );
  }
}
