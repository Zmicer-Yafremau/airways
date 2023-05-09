import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { TopSummaryComponent } from './components/top-summary/top-summary.component';

@NgModule({
  declarations: [BookingFlowComponent, TopSummaryComponent],
  imports: [CommonModule, BookingRoutingModule, MatButtonModule],
})
export class BookingModule {}
