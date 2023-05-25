import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PassengerService } from 'src/app/services/passenger.service';
import { Validator } from 'src/app/shared/validators/validator';
import * as _ from 'lodash';

@Component({
  selector: 'app-passengers-contacts',
  templateUrl: './passengers-contacts.component.html',
  styleUrls: ['./passengers-contacts.component.scss'],
})
export class PassengersContactsComponent implements OnInit {
  public email!: string;

  public contactForm!: FormGroup;

  public selected = '+93';

  public constructor(public fb: FormBuilder, public passengerService: PassengerService) {}

  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
      countryCode: ['+93'],
    });
    this.passengerService.passengerContacts.subscribe((passengersContacts)=>{
      // console.log('from info');
      const passengersContactsClone = _.cloneDeep(passengersContacts);
      if(passengersContactsClone) {
        // console.log('from info if');
        this.contactForm.setValue({
          contactEmail: passengersContactsClone.mail,
          phone:passengersContactsClone.phone,
          countryCode: passengersContactsClone.countryCode,
        });            }
    });
    this.contactForm.statusChanges.pipe(debounceTime(1000)).subscribe(() => {
      // console.log('contactChange');
     this.passengerService.addPassengerContact({
        countryCode: this.contactForm.value.countryCode, 
        phone: this.contactForm.value.phone,
        mail: this.contactForm.value.contactEmail,
        formIsValid: false,
      });
      if (this.contactForm.valid) {
        // console.log('valid contacts');
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
