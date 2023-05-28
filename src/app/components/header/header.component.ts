import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { ShowEditService } from 'src/app/services/show-edit.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@UntilDestroy()
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

  public order$ = this.orderService.getUnpaidOrders();

  public constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private dateCurrencyService: GetDateCurrencyFormatService,
    public toggleEdiService: ShowEditService,
    private router: Router,
    private stepService: ChangeStepService,
    private orderService: OrderService,
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
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const e = event as NavigationEnd;
        if (!e.urlAfterRedirects.includes('flights')) {
          this.isEdit$.next(false);
        }
      });
  }

  public openAuthDialog() {
    this.matDialog.open(AuthModalComponent, {
      minWidth: '310px',
    });
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

  public logoClick() {
    this.stepService.changeStep({
      flights: 'active',
      passengers: 'inactive',
      review: 'inactive',
    });
    this.router.navigateByUrl('/');
  }
}
