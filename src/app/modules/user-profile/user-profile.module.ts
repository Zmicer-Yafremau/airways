import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { TripInfoComponent } from './components/trip-info/trip-info.component';

@NgModule({
  declarations: [CartComponent, TripInfoComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class UserProfileModule {}
