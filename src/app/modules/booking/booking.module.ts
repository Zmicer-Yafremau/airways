import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { QuantityIndicatorDirective } from 'src/app/directives/quantity-indicator.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { TopSummaryComponent } from './components/top-summary/top-summary.component';
import { TestComponent } from './components/test/test.component';
import { FlightInfoComponent } from './components/flight-card/flight-info/flight-info.component';
import { SliderComponent } from './components/slider/slider.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { BookingComponent } from './booking.component';
import { PassengersCardComponent } from './components/passengers-card/passengers-card.component';
import { PassengersInfoComponent } from './components/passengers-card/passengers-info/passengers-info.component';
import { PassengersContactsComponent } from './components/passengers-card/passengers-contacts/passengers-contacts.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BookingComponent,
    QuantityIndicatorDirective,
    FlightCardComponent,
    FlightInfoComponent,
    SliderComponent,
    BookingFlowComponent,
    TopSummaryComponent,
    TestComponent,
    PassengersCardComponent,
    PassengersInfoComponent,
    PassengersContactsComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  exports: [QuantityIndicatorDirective],
})
export class BookingModule {}
