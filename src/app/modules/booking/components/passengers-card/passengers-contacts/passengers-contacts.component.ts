import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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

  public constructor(public fb: FormBuilder) {}
  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
    });
  }
  public getMailErrorMessage() {
    if (this.contactForm.controls['contactEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.contactForm.controls['contactEmail'].hasError('email') ? 'Not a valid email' : '';
  }
}
