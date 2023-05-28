import { Component, OnInit } from '@angular/core';
import { CountTripService } from 'src/app/services/count-trip.service';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { OrderService } from 'src/app/services/order.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { ISummary } from 'src/app/types/Summary';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public tabNames = ['No.', 'Flight', 'Type trip', 'Data & Time', 'Passengers', 'Price'];

  public totalPrice = 0;

  public trips = 0;

  public orderedTrips = this.summary.getUnpaidOrders();

  public userCurrency: Currency = 'eur';

  public toPay: ISummary[] = [];

  public constructor(
    public tripService: CountTripService,
    private summary: OrderService,
    private currencyService: GetDateCurrencyFormatService,
  ) {}

  public ngOnInit(): void {
    this.tripService.getTrips().subscribe((trips) => {
      this.trips = trips;
    });

    this.summary.getUnpaidOrders().subscribe((trips) => {
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

  public onCheck({ trip, type }: { trip: ISummary; type: string }) {
    if (type === 'add') {
      this.toPay.push(trip);
    } else {
      const toPayNew = this.toPay.filter(
        (el) => el.forward.flightNumber !== trip.forward.flightNumber,
      );
      this.toPay = [...toPayNew];
    }

    console.log(this.toPay);
  }

  public onPayment() {
    console.log(this.toPay);
    this.toPay.forEach((item) => {
      this.summary.setPaidOrder(item);
      this.summary.rmUnpaidItem(item.forward.flightNumber);
    });
  }
}
