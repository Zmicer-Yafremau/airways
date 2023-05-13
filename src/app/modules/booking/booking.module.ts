import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityIndicatorDirective } from 'src/app/directives/quantity-indicator.directive';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightInfoComponent } from './components/flight-card/flight-info/flight-info.component';
import { SliderComponent } from './components/slider/slider.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { BookingComponent } from './booking.component';

@NgModule({
  declarations: [
    BookingComponent,
    QuantityIndicatorDirective,
    FlightCardComponent,
    FlightInfoComponent,
    SliderComponent,
  ],
  imports: [CommonModule, BookingRoutingModule],
  exports: [QuantityIndicatorDirective],
})
export class BookingModule {}
