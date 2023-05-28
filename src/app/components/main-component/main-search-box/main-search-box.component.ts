import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';
import { AirportContentService } from 'src/app/services/airport-content.service';
import { IPassengerConfig, IPassengers } from 'src/app/types/IPassengerConfig';
import { IUserRequestInfo } from 'src/app/types/IUserRequestInfo';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LocalStorageKeyEnum } from 'src/app/types/LocalStorageValue';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShowEditService } from 'src/app/services/show-edit.service';
import { ToastService } from 'angular-toastify';

@UntilDestroy()
@Component({
  selector: 'app-main-search-box',
  templateUrl: './main-search-box.component.html',
  styleUrls: ['./main-search-box.component.scss'],
})
export class MainSearchBoxComponent implements OnInit {
  @ViewChildren('input') private inputs?: QueryList<ElementRef<HTMLSpanElement>>;

  @Input() public isHeaderForm = false;

  public searchFlyForm!: FormGroup;

  public requestInfo!: IUserRequestInfo;

  public airports$ = this.airportService.airports$;

  public startDate = '';

  public passengersConfig: IPassengerConfig = {
    adults: {
      key: 'adults',
      title: 'Adult',
      age: '14+ years',
    },
    children: {
      key: 'children',
      title: 'Child',
      age: '2-14 years',
    },
    infants: {
      key: 'infants',
      title: 'Infant',
      age: '0-2 years',
    },
  };

  public passengers: IPassengers = {
    adults: 0,
    children: 0,
    infants: 0,
    sum: 0,
  };

  public roundTrip = true;

  public airportDepartureNameForSelectHeader = '';

  public airportArrivalNameForSelectHeader = '';

  public todayDate = new Date();

  public constructor(
    private fb: FormBuilder,
    private getUserRequestService: GetUserRequestInfoService,
    private router: Router,
    private airportService: AirportContentService,
    private ls: LocalStorageService,
    private editService: ShowEditService,
    private toast: ToastService,
  ) {}

  public ngOnInit(): void {
    this.getUserRequestService.getUserRequestInfo().subscribe((value) => {
      if (value) this.roundTrip = value.roundTrip;
    });
    this.searchFlyForm = this.fb.group({
      from: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', Validators.required],
      departureReturnDate: [''],
      passengers: ['', Validators.required],
    });

    this.airportService.getAllAirports();

    if (this.isHeaderForm) {
      const lsValue = this.ls.getValue(LocalStorageKeyEnum.TOP_SUMMARY);
      if (lsValue) {
        const userInfo = JSON.parse(lsValue) as IUserRequestInfo;

        this.airports$.pipe(untilDestroyed(this)).subscribe((airports) => {
          const toSelectFrom = airports.find((airport) => airport.key === userInfo.from);
          const toSelectDest = airports.find((airport) => airport.key === userInfo.destination);
          this.startDate = userInfo.departureDate;

          this.searchFlyForm.setValue({
            from: userInfo.from,
            destination: userInfo.destination,
            departureDate: userInfo.departureDate,
            departureReturnDate: userInfo.departureReturnDate,
            passengers: userInfo.passengers.sum,
          });
          this.passengers = {
            ...userInfo.passengers,
          };
          if (toSelectFrom) {
            this.airportDepartureNameForSelectHeader = toSelectFrom.city;
          }
          if (toSelectDest) this.airportArrivalNameForSelectHeader = toSelectDest.city;
        });
      }
    }
  }

  public onSubmit() {
    const from = this.searchFlyForm.controls['from'].value;
    const to = this.searchFlyForm.controls['destination'].value;
    if (from === to && from && to)
      this.toast.error("Airports of departure and arrival can't be the same!");

    if (!this.passengers.adults) this.toast.warn('Please input at least 1 adult');

    if (
      this.searchFlyForm.valid &&
      this.passengers.sum > 0 &&
      from !== to &&
      this.passengers.adults
    ) {
      this.requestInfo = {
        ...this.searchFlyForm.value,
        passengers: this.passengers,
        roundTrip: this.roundTrip,
      };
      this.getUserRequestService.setUserRequestInfo(this.requestInfo);
      this.router.navigateByUrl('/booking');
      if (this.isHeaderForm) this.editService.isEditActive$.next(false);
    }
  }

  public typeOfTrip(e: MatRadioChange) {
    this.roundTrip = e.value === 'round';
  }

  public handlePassengersChange(newPassengers: IPassengers) {
    this.passengers = { ...newPassengers };
  }

  public reverse() {
    if (this.inputs?.length === 2) {
      const inputs = this.inputs.map((el) => el.nativeElement);
      const buff = inputs[0].textContent;
      inputs[0].textContent = inputs[1].textContent;
      inputs[1].textContent = buff;

      const buffer = this.searchFlyForm.get('from')?.value;

      this.searchFlyForm.controls['from'].setValue(this.searchFlyForm.get('destination')?.value);

      this.searchFlyForm.controls['destination'].setValue(buffer);
    }
  }

  public getAirportDepartureNameForSelectHeader(text: string) {
    this.airportDepartureNameForSelectHeader = text;
  }

  public getAirportArrivalNameForSelectHeader(text: string) {
    this.airportArrivalNameForSelectHeader = text;
  }
}
