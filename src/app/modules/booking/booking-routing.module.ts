import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlowComponent } from './components/booking-flow/booking-flow.component';
import { SliderComponent } from './components/slider/slider.component';

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
        path: ':step',
        component: SliderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
