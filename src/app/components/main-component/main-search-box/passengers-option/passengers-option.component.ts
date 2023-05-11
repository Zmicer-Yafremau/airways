import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPassengerText, IPassengers } from 'src/app/types/IPassengerConfig';

@Component({
  selector: 'app-passengers-option',
  templateUrl: './passengers-option.component.html',
  styleUrls: ['./passengers-option.component.scss'],
})
export class PassengersOptionComponent {
  @Input() public config!: IPassengerText;

  @Output() public passengersEvent = new EventEmitter<IPassengers>();

  @Input() public passengers!: IPassengers;

  public changePassengers(passenger: 'Adult' | 'Child' | 'Infant', action: 'add' | 'remove') {
    if (action === 'add') {
      switch (passenger) {
        case 'Adult':
          this.passengers.adults += 1;
          break;
        case 'Child':
          this.passengers.children += 1;
          break;
        default:
          this.passengers.infants += 1;
      }
    } else if (action === 'remove') {
      switch (passenger) {
        case 'Adult':
          if (this.passengers.adults > 0) {
            this.passengers.adults -= 1;
          }
          break;
        case 'Child':
          if (this.passengers.children > 0) {
            this.passengers.children -= 1;
          }
          break;
        default:
          if (this.passengers.infants > 0) {
            this.passengers.infants -= 1;
          }
      }
    }
    this.passengers.sum =
      this.passengers.adults + this.passengers.children + this.passengers.infants;
    this.passengersEvent.emit(this.passengers);
  }
}
