import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { debounceTime } from 'rxjs';
import { IPassengerForm, PassengerType } from 'src/app/models/passenger-model';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit {
  @Input() passengerType!: PassengerType;

  @Input() passengerId!: number;

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
      gender: [''],
      needAssistance: [''],
    });
    this.passengerService.passengers.subscribe((passengers) => {
    this.passengerForm.statusChanges.pipe(debounceTime(1000)).subscribe((status) => {
      console.log('changes');
        const newPassengers = { ...passengers };
        (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].formIsValid =
            false;
        if (this.passengerForm.valid) {
          console.log('valid info');
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].firstName =
            this.passengerForm.value.firstName;
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].lastName =
            this.passengerForm.value.lastName;
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].dateOfBirth =
            this.passengerForm.value.dateOfBirth;
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].gender =
            this.passengerForm.value.gender;
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].needAssistance =
            this.passengerForm.value.needAssistance;
          (newPassengers[this.passengerType] as [IPassengerForm])[this.passengerId].formIsValid =
            true;
        } 
        this.passengerService.addPassengers(newPassengers);
      });
    });
  }
}
