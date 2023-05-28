import { Injectable } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ILogUser, IRegUser, IToken, IUser } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userName = new BehaviorSubject<string>(
    localStorage.getItem('userName') ? (localStorage.getItem('userName') as string) : '',
  );

  public userIsLogged = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

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

  public logUser = new BehaviorSubject<ILogUser>({
    email: '',
    password: '',
  });

  public isLoggedWithOath = new BehaviorSubject<boolean>(false);

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

  public getRegToken(value: IRegUser) {
    this.httpClient
      .post<IToken>(`${this.url}/auth/registration`, JSON.stringify(value), {
        headers: this.headers,
      })
      .subscribe(
        (tokenObj) => {
          localStorage.setItem('token', tokenObj.token);
          localStorage.setItem('userName', value.firstName);
          this.userName.next(localStorage.getItem('userName') as string);
          this.userIsLogged.next(!!localStorage.getItem('token'));
          this.dialog.closeAll();
          this.toastService.success('Success');
        },
        (error) => {
          if (error.message) {
            console.log(error.error.message);
            this.toastService.error(error.error.message);
          } else {
            console.log(JSON.stringify(error));
            this.toastService.error('Smth went wrong');
          }
        },
      );
  }

  public getLogToken(value: ILogUser) {
    this.httpClient
      .post<IToken>(`${this.url}/auth/login`, JSON.stringify(value), {
        headers: this.headers,
      })
      .subscribe(
        (tokenObj) => {
          localStorage.setItem('token', tokenObj.token);
          this.userIsLogged.next(!!localStorage.getItem('token'));
          this.dialog.closeAll();
          this.toastService.success('Success');
        },
        (error) => {
          if (error.message) {
            this.toastService.error(error.error.message);
          } else {
            this.toastService.error('Smth went wrong');
          }
        },
      );
  }
}
