import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { BookingComponent } from './booking.component';
import { FlightInfoComponent } from './components/flight-card/flight-info/flight-info.component';

@NgModule({
  declarations: [FlightCardComponent, BookingComponent, FlightInfoComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
