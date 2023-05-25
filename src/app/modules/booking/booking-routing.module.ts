import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { SummaryComponent } from './pages/summary/summary.component';

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
        component: FlightsComponent,
      },
      {
        path: 'passengers',
        component: FlightsComponent,
      },
      {
        path: 'review',
        component: SummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
