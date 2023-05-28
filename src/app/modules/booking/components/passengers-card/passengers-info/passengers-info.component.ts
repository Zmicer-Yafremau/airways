import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { debounceTime } from 'rxjs';
import { IPassengerForm, IPassengers, PassengerType } from 'src/app/models/passenger-model';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit {
  @Input() public passengerType!: PassengerType;

  @Input() public passengerId!: number;

  public color: ThemePalette = 'primary';

  public notInfant = true;

  public passengerForm!: FormGroup;

  public baggage = 1;

  public constructor(
    public fb: FormBuilder,
    private stepService: ChangeStepService,
    private passengerService: PassengerService,
  ) {}

  public ngOnInit(): void {
    this.notInfant = this.passengerType !== 'infants';
    this.passengerForm = this.fb.group({
      firstName: ['', [Validators.required, Validator.nameValidator]],
      lastName: ['', [Validators.required, Validator.nameValidator]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      baggage: [false],
      baggageAmount: [0, [Validators.required]],
    });
    this.stepService.progressCondition$.subscribe((condition) => {
      if (localStorage.getItem('passengersInfo') && condition.passengers === 'active') {
        const passengersInfoFromLocalStorage = JSON.parse(
          localStorage.getItem('passengersInfo') as string,
        ) as IPassengers;
        const genderFromService = (
          passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm]
        )[this.passengerId].gender
          ? (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
              this.passengerId
            ].gender
          : '';
        this.passengerForm.setValue({
          firstName: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].firstName,
          lastName: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].lastName,
          dateOfBirth: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].dateOfBirth,
          gender: genderFromService,
          baggage: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].baggage,
          baggageAmount: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].baggageAmount,
        });
      }
    });
    this.passengerForm.statusChanges.pipe(debounceTime(1000)).subscribe((status) => {
      const dateOfBirth = this.passengerForm.value.dateOfBirth ? new Date(this.passengerForm.value.dateOfBirth) : '';
      const isoDateOfBirth = dateOfBirth ? dateOfBirth.toISOString() : '';
      const passGender = this.passengerForm.value.gender ? this.passengerForm.value.gender : '';
      const passengerInfo: IPassengerForm = {
        id: this.passengerId,
        passengerType: this.passengerType,
        firstName: this.passengerForm.value.firstName,
        lastName: this.passengerForm.value.lastName,
        gender: passGender,
        dateOfBirth: isoDateOfBirth,
        baggage: !!this.passengerForm.value.baggage,
        baggageAmount: this.passengerForm.value.baggageAmount ? this.passengerForm.value.baggageAmount : 0,
        formIsValid: false,
      };
      // console.log(this.passengerForm);
      // console.log(passengerInfo);
      if (status === 'VALID') {
        passengerInfo.formIsValid = true;
        passengerInfo.gender = passGender;
      }
      this.passengerService.addPassengerForm(passengerInfo);
    });
  }
}
