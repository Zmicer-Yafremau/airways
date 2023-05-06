import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main-component/main.component';

const routes: Routes = [
  {
    path: 'booking',
    loadChildren: () => import('./modules/booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user-profile/user-profile.module').then((m) => m.UserProfileModule),
  },
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
