import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [CommonModule, UserProfileRoutingModule],
})
export class UserProfileModule {}
