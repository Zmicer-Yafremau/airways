import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { ShowEditService } from 'src/app/services/show-edit.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isBookingUrl = false;

  public userName!: string;

  public userIsLogged!: boolean;

  public isEdit$ = this.toggleEdiService.isEditActive$;

  public constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private dateCurrencyService: GetDateCurrencyFormatService,
    public toggleEdiService: ShowEditService,
    private router: Router,
  ) {
    this.toggleIsBookingUrl();
  }

  public ngOnInit() {
    this.authService.userName.subscribe((name) => {
      this.userName = name;
    });
    this.authService.userIsLogged.subscribe((isLogged) => {
      this.userIsLogged = isLogged;
    });
  }

  public openAuthDialog() {
    this.matDialog.open(AuthModalComponent);
  }

  public logOut() {
    localStorage.clear();
    this.userName = '';
    this.userIsLogged = false;
  }

  private toggleIsBookingUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        const e = event as NavigationStart;
        if (e.url.includes('/booking')) {
          this.isBookingUrl = true;
        } else if (!e.url.includes('/booking')) {
          this.isBookingUrl = false;
        }
      });
  }

  public setUserSettings(value: string, option: 'currency' | 'date') {
    if (option === 'currency') {
      this.dateCurrencyService.changeFormat({
        currency: value,
        date: this.dateCurrencyService.dateCurrencyFormat$.value.date,
      });
    } else {
      this.dateCurrencyService.changeFormat({
        currency: this.dateCurrencyService.dateCurrencyFormat$.value.currency,
        date: value,
      });
    }
  }
}
