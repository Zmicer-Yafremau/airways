import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'prefix',
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
