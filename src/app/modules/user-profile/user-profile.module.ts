import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { TripInfoComponent } from './components/cart/components/trip-info/trip-info.component';
import { BookingModule } from '../booking/booking.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [CartComponent, TripInfoComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    BookingModule,
  ],
})
export class UserProfileModule {}
