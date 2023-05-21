import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-passengers-info',
  templateUrl: './passengers-info.component.html',
  styleUrls: ['./passengers-info.component.scss'],
})
export class PassengersInfoComponent implements OnInit {
  
  @Input() passengerType!: string;

  public  color: ThemePalette = 'primary';

  public notInfant = true;

  public passengerForm!: FormGroup;

  public constructor(public fb: FormBuilder, private stepService: ChangeStepService, private passengerService: PassengerService) {}

  public ngOnInit(): void {
    this.notInfant = this.passengerType !== 'Infants';
    this.passengerForm = this.fb.group({
      firstName: ['', [Validators.required, Validator.nameValidator]],
      lastName: ['', [Validators.required, Validator.nameValidator]],
      date: ['', [Validators.required]],
      gender: [''],
      needAssistance: [''],
    });
    this.passengerForm.statusChanges.subscribe((status) => {
      this.passengerService.passengers.subscribe((passengers)=>{
        
        if (this.passengerForm.valid) {
    
        } else {}
      })
      
    });
  }
}
