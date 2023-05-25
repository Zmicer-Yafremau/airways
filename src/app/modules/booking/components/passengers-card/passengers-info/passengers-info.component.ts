import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { debounceTime } from 'rxjs';
import { IPassengerForm, PassengerType } from 'src/app/models/passenger-model';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';
import * as _ from 'lodash';

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

    this.passengerService.passengers.subscribe((passengers) => {
      // console.log('from info');
      // console.log(passengers);
      const passengersClone = _.cloneDeep(passengers);
      // console.log(passengersClone);
      if ((passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId]) {
        // console.log('from info if');
        // console.log((passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId]);
        const genderFromService = (passengersClone[this.passengerType] as [IPassengerForm])[
          this.passengerId
        ].gender
          ? (passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId].gender
          : 'male';
        this.passengerForm.setValue({
          firstName: (passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId]
            .firstName,
          lastName: (passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId]
            .lastName,
          dateOfBirth: (passengersClone[this.passengerType] as [IPassengerForm])[this.passengerId]
            .dateOfBirth,
          gender: genderFromService,
          needAssistance: (passengersClone[this.passengerType] as [IPassengerForm])[
            this.passengerId
          ].needAssistance,
        });
      }
    });
    this.passengerForm.statusChanges.pipe(debounceTime(1000)).subscribe(() => {
      // console.log('changes from form');
      const passengerInfo = {
        id: this.passengerId,
        passengerType: this.passengerType,
        firstName: this.passengerForm.value.firstName,
        lastName: this.passengerForm.value.lastName,
        gender: this.passengerForm.value.gender ? this.passengerForm.value.gender : 'male',
        dateOfBirth: this.passengerForm.value.dateOfBirth,
        needAssistance: this.passengerForm.value.needAssistance,
        formIsValid: false,
      };
      // console.log(this.passengerId);
      if (this.passengerForm.valid) {
        // console.log('valid info');
        passengerInfo.formIsValid = true;
      }
      this.passengerService.addPassengerForm(passengerInfo);
    });
  }
}
