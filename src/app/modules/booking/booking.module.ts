import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuantityIndicatorDirective } from 'src/app/directives/quantity-indicator.directive';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { TopSummaryComponent } from './components/top-summary/top-summary.component';
import { FlightInfoComponent } from './components/flight-card/flight-info/flight-info.component';
import { SliderComponent } from './components/slider/slider.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { BookingComponent } from './booking.component';
import { FlightsComponent } from './pages/flights/flights.component';

@NgModule({
  declarations: [
    BookingComponent,
    QuantityIndicatorDirective,
    FlightCardComponent,
    FlightInfoComponent,
    SliderComponent,
    BookingFlowComponent,
    TopSummaryComponent,
    FlightsComponent,
    CustomCurrencyPipe,
  ],
  imports: [CommonModule, BookingRoutingModule, MatButtonModule],
  exports: [QuantityIndicatorDirective],
})
export class BookingModule {}
