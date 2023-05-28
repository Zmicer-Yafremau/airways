import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { CountTripService } from 'src/app/services/count-trip.service';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { OrderService } from 'src/app/services/order.service';
import { Currency } from 'src/app/types/IDateCurrencyFormat';
import { ISummary } from 'src/app/types/Summary';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss'],
})
export class TripInfoComponent implements OnInit {
  @Input() public trip?: ISummary;

  @Output() public tripToPay = new EventEmitter<{ trip: ISummary; type: string }>();

  public flightCode?: string;

  public from?: string;

  public destination?: string;

  public roundTrip?: string;

  public dateDeparture?: Date;

  public dateArrival?: Date;

  public passengers = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  public price?: number;

  public userCurrency: Currency = 'eur';

  public trips = 0;

  public constructor(
    private currencyService: GetDateCurrencyFormatService,
    public tripService: CountTripService,
    private summary: OrderService,
    private toast: ToastService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.tripService.getTrips().subscribe((value) => {
      this.trips = value;
    });

    if (this.trip) {
      this.flightCode = this.trip?.forward.flightNumber;
      this.from = this.trip.forward.departureTimeInfo.city;
      this.destination = this.trip.forward.arrivalTimeInfo.city;
      this.roundTrip = this.trip.tripType;
      this.dateDeparture = this.trip.forward.departureTimeInfo.date;
      this.dateArrival = this.trip.back?.departureTimeInfo.date;
      this.passengers.adults = this.trip.quantity.adults;
      this.passengers.children = this.trip.quantity.children;
      this.passengers.infants = this.trip.quantity.infants;
      this.currencyService.dateCurrencyFormat$.subscribe((info) => {
        this.userCurrency = info.currency as Currency;
        this.price = this.trip?.totalSum[this.userCurrency];
      });
    }
  }

  public onCheck(e: MatCheckboxChange) {
    if (e.checked && this.trip) {
      this.tripService.changeTrip(this.trips + 1);
      this.tripToPay.emit({ trip: this.trip, type: 'add' });
    }
    if (!e.checked && this.trip) {
      this.tripService.changeTrip(this.trips - 1);
      this.tripToPay.emit({ trip: this.trip, type: 'delete' });
    }
  }

  public onDelete() {
    if (this.trip) this.summary.rmUnpaidItem(this.trip.forward.flightNumber);
    this.toast.success('The order successfully deleted');
  }

  public onEdit() {
    // this.router.navigateByUrl('/booking/step/passengers');
  }
}
