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
    this.passengerForm.statusChanges.pipe(debounceTime(1000)).subscribe((status) => {

      console.log('changes from form');
        const passengerInfo = {
          id: this.passengerId,
          passengerType: this.passengerType,
          firstName: this.passengerForm.value.firstName,
          lastName: this.passengerForm.value.lastName,
          gender: this.passengerForm.value.gender,
          dateOfBirth: this.passengerForm.value.dateOfBirth,
          needAssistance: this.passengerForm.value.needAssistance,
          formIsValid: false,
        }
        console.log(passengerInfo);
        if (this.passengerForm.valid) {
          console.log('valid info');
          passengerInfo.formIsValid = true;
        } 
        this.passengerService.addPassengerForm(passengerInfo);
      });
  }
}
