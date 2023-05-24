import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { debounceTime } from 'rxjs';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-passengers-contacts',
  templateUrl: './passengers-contacts.component.html',
  styleUrls: ['./passengers-contacts.component.scss'],
})
export class PassengersContactsComponent implements OnInit {
  public email!: string;

  public contactForm!: FormGroup;

  public codeControl = new FormControl('+93' as ThemePalette);

  public constructor(public fb: FormBuilder, public passengerService: PassengerService) {}

  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
    });
    this.contactForm.statusChanges.pipe(debounceTime(1000)).subscribe((status) => {
      console.log('contactChange');
      this.passengerService.addPassengerContact({
        countryCode: '',
        phone: '',
        mail: '',
        formIsValid: false,
      });
      if (this.contactForm.valid) {
        console.log('valid contacts');
        this.passengerService.addPassengerContact({
          countryCode: this.codeControl.value as string,
          phone: this.contactForm.value.phone,
          mail: this.contactForm.value.contactEmail,
          formIsValid: true,
        });
      }
    });
  }

  public getMailErrorMessage() {
    if (this.contactForm.controls['contactEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.contactForm.controls['contactEmail'].hasError('email') ? 'Not a valid email' : '';
  }
}
