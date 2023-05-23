import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public tabNames = ['No.', 'Flight', 'Type trip', 'Data & Time', 'Passengers', 'Price'];
}
