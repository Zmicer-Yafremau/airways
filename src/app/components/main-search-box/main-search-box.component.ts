import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

interface IPassengers {
  adults: number;
  children: number;
  infants: number;
}

interface IRequestInfo {
  from: string;
  destination: string;
  departureDate: string;
  departureReturnDate: string;
  passengers: IPassengers;
}

@Component({
  selector: 'app-main-search-box',
  templateUrl: './main-search-box.component.html',
  styleUrls: ['./main-search-box.component.scss'],
})
export class MainSearchBoxComponent implements OnInit {
  @ViewChild('destinationName')
  public destinationName!: ElementRef<HTMLDivElement>;

  public searchFlyForm!: FormGroup;

  public requestInfo?: IRequestInfo;

  public airports = [
    ['Warsaw', ' WAW'],
    ['Berlin', ' BER'],
    ['Minsk', ' MSQ'],
    ['Zagreb', ' ZAG'],
  ];

  public passengers: IPassengers = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  public roundTrip = true;

  public constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.searchFlyForm = this.fb.group({
      from: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', Validators.required],
      departureReturnDate: [''],
    });
  }

  public onClick() {
    if (this.searchFlyForm.valid) {
      this.requestInfo = { ...this.searchFlyForm.value, passengers: this.passengers };
      console.log(this.requestInfo);
    }
  }

  public typeOfTrip(e: MatRadioChange) {
    this.roundTrip = e.value === 'round';
  }

  public changePassengers(passenger: string, action: 'add' | 'remove') {
    if (action === 'add') {
      switch (passenger) {
        case 'adult':
          this.passengers.adults += 1;
          break;
        case 'child':
          this.passengers.children += 1;
          break;
        default:
          this.passengers.infants += 1;
      }
    } else if (action === 'remove') {
      switch (passenger) {
        case 'adult':
          if (this.passengers.adults > 0) {
            this.passengers.adults -= 1;
          }
          break;
        case 'child':
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
  }

  public reverse() {
    // const a = this.searchFlyForm.controls['from'].value;
    // const b = this.searchFlyForm.controls['destination'].value;
    // console.log(a, b);
    console.log(this.destinationName);
    // this.destinationName.nativeElement.innerText = 'text';
  }
}
