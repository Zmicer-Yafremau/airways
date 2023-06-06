import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { SummaryComponent } from './pages/summary/summary.component';
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
        component: FlightsComponent,
      },
      {
        path: 'passengers',
        component: PassengersCardComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'review',
        component: SummaryComponent,
        canActivate: [UserGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
