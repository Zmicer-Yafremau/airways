import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { TestComponent } from './components/test/test.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { PassengersCardComponent } from './components/passengers-card/passengers-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'step/flights',
    pathMatch: 'prefix',
  },
  {
    path: 'step',
    component: BookingFlowComponent,
    children: [
      {
        path: 'flights',
        component: FlightCardComponent,
      },
      {
        path: 'passengers',
        component: PassengersCardComponent,
      },
      {
        path: 'review',
        component: TestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
