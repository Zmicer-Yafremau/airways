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
      needAssistance: [false],
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
          : 'male';
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
          needAssistance: (passengersInfoFromLocalStorage[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].needAssistance,
        });
      }
    });
    this.passengerForm.statusChanges.pipe(debounceTime(1000)).subscribe(() => {
      const dateOfBirth = new Date(this.passengerForm.value.dateOfBirth);
      const isoDateOfBirth = dateOfBirth.toISOString();
      const passengerInfo = {
        id: this.passengerId,
        passengerType: this.passengerType,
        firstName: this.passengerForm.value.firstName,
        lastName: this.passengerForm.value.lastName,
        gender: this.passengerForm.value.gender ? this.passengerForm.value.gender : 'male',
        dateOfBirth: isoDateOfBirth,
        needAssistance: this.passengerForm.value.needAssistance,
        formIsValid: false,
      };
      if (this.passengerForm.valid) {
        passengerInfo.formIsValid = true;
      }
      this.passengerService.addPassengerForm(passengerInfo);
    });
  }
}
