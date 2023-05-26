import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';
import { IPassengerContacts } from 'src/app/models/passenger-model';
import { ChangeStepService } from 'src/app/services/change-step.service';

@Component({
  selector: 'app-passengers-contacts',
  templateUrl: './passengers-contacts.component.html',
  styleUrls: ['./passengers-contacts.component.scss'],
})
export class PassengersContactsComponent implements OnInit {
  public email!: string;

  public contactForm!: FormGroup;

  public selected = '+93';

  public constructor(public fb: FormBuilder, public passengerService: PassengerService, public stepService: ChangeStepService) {}

  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
      countryCode: ['+93'],
    });
    this.stepService.progressCondition$.subscribe((condition)=> {

      if (localStorage.getItem('passengersContact') && condition.passengers === 'active') {
        const passengersContactFromLocalStorage = JSON.parse(
          localStorage.getItem('passengersContact') as string,
        ) as IPassengerContacts;
        this.contactForm.setValue({
          contactEmail: passengersContactFromLocalStorage.mail,
          phone: passengersContactFromLocalStorage.phone,
          countryCode: passengersContactFromLocalStorage.countryCode,
        });
      }
    });
    this.contactForm.statusChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.passengerService.addPassengerContact({
        countryCode: this.contactForm.value.countryCode,
        phone: this.contactForm.value.phone,
        mail: this.contactForm.value.contactEmail,
        formIsValid: false,
      });
      if (this.contactForm.valid) {
        this.passengerService.addPassengerContact({
          countryCode: this.contactForm.value.countryCode,
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
