import { Component, OnInit, Input } from '@angular/core';
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

@UntilDestroy()
@Component({
  selector: 'app-main-search-box',
  templateUrl: './main-search-box.component.html',
  styleUrls: ['./main-search-box.component.scss'],
})
export class MainSearchBoxComponent implements OnInit {
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

  public constructor(
    private fb: FormBuilder,
    private getUserRequestService: GetUserRequestInfoService,
    private router: Router,
    private airportService: AirportContentService,
    private ls: LocalStorageService,
    private editService: ShowEditService,
  ) {}

  public ngOnInit(): void {
    this.searchFlyForm = this.fb.group({
      from: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDate: ['', Validators.required],
      departureReturnDate: [''],
      passengers: ['', Validators.required],
    });

    this.airportService.getAllAirports();

    if (this.isHeaderForm) {
      console.log('edit');
      const lsValue = this.ls.getValue(LocalStorageKeyEnum.TOP_SUMMARY);
      if (lsValue) {
        const userInfo = JSON.parse(lsValue) as IUserRequestInfo;

        this.airports$.pipe(untilDestroyed(this)).subscribe((airports) => {
          const toSelectFrom = airports.find((airport) => airport.key === userInfo.from);
          const toSelectDest = airports.find((airport) => airport.key === userInfo.destination);
          this.startDate = userInfo.departureDate;
          console.log(toSelectFrom, toSelectDest);

          // this.searchFlyForm.get('from')?.setValue(toSelectFrom?.city);
          // this.searchFlyForm.get('destination')?.setValue(toSelectDest?.city);
          if (toSelectFrom) {
            this.airportDepartureNameForSelectHeader = toSelectFrom.city;
            console.log(
              'this.airportDepartureNameForSelectHeader',
              this.airportDepartureNameForSelectHeader,
            );
          }
          if (toSelectDest) this.airportArrivalNameForSelectHeader = toSelectDest.city;
        });
      }
    }
  }

  public onClick() {
    if (this.searchFlyForm.valid && this.passengers.sum > 0) {
      this.requestInfo = { ...this.searchFlyForm.value, passengers: this.passengers };
      this.getUserRequestService.setUserRequestInfo(this.requestInfo);
      this.router.navigateByUrl('/booking');
      if (this.isHeaderForm) this.editService.toggleEdit();
    }
  }

  public typeOfTrip(e: MatRadioChange) {
    this.roundTrip = e.value === 'round';
  }

  public handlePassengersChange(newPassengers: IPassengers) {
    this.passengers = { ...newPassengers };
    console.log('new passengers', this.passengers);
  }

  public reverse() {
    console.log('reverse');
  }

  public getAirportDepartureNameForSelectHeader(text: string) {
    this.airportDepartureNameForSelectHeader = text;
  }

  public getAirportArrivalNameForSelectHeader(text: string) {
    this.airportArrivalNameForSelectHeader = text;
  }
}
