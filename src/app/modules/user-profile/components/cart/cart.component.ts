import { Component, OnInit } from '@angular/core';
import { CountTripService } from 'src/app/services/count-trip.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public tabNames = ['No.', 'Flight', 'Type trip', 'Data & Time', 'Passengers', 'Price'];

  public totalPrice = '6666';

  public trips = 0;

  public orderedTrips = this.summary.getUnpaidOrders();

  public constructor(public tripService: CountTripService, private summary: OrderService) {}

  public ngOnInit(): void {
    this.tripService.getTrips().subscribe((trips) => {
      this.trips = trips;
    });
  }
}
