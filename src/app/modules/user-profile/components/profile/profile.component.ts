import { Component, OnInit } from '@angular/core';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { OrderService } from 'src/app/services/order.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public tabNames = ['No.', 'Flight', 'Type trip', 'Data & Time', 'Passengers', 'Price'];

  public totalPrice = 0;

  public trips = 0;

  public orderedTrips = this.summary.getPaidOrders();

  public userCurrency: Currency = 'eur';

  public constructor(
    private summary: OrderService,
    private currencyService: GetDateCurrencyFormatService,
  ) {}

  public ngOnInit(): void {
    this.summary.getPaidOrders().subscribe((trips) => {
      if (trips)
        this.currencyService.dateCurrencyFormat$.subscribe((info) => {
          this.userCurrency = info.currency as Currency;
          this.totalPrice = trips.reduce((acc, trip) => {
            let total = 0;
            total = acc + trip.totalSum[this.userCurrency];
            return total;
          }, 0);
        });
    });
  }
}
