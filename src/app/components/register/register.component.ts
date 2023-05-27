import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/services/auth.service';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public email!: string;

  public regForm!: FormGroup;

  public hide = true;

  public agree = false;

  public codeControl = new FormControl('+93' as ThemePalette);

  public constructor(
    public fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.regForm = this.fb.group({
      regEmail: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validator.nameValidator]],
      lastName: ['', [Validators.required, Validator.nameValidator]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
      date: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      citizenship: [''],
      gender: [''],
    });
    this.authService.user.subscribe((user) => {
      this.regForm.setValue({
        regEmail: user.email,
        firstName: user.firtsName,
        lastName: user.lastName,
        phone: this.regForm.value.phone,
        date: this.regForm.value.date,
        pass: this.regForm.value.pass,
        citizenship: this.regForm.value.citizenship,
        gender: this.regForm.value.gender,
      });
    });
  }

  public getMailErrorMessage() {
    if (this.regForm.controls['regEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.controls['regEmail'].hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit() {
    if (this.regForm.valid && this.agree) {
      const dateOfBirth = new Date(this.regForm.value.date);
      const isoDateOfBirth = dateOfBirth.toISOString();
      this.authService.getRegToken({
        email: this.regForm.value.regEmail,
        password: this.regForm.value.pass,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName,
        dateOfBirth: isoDateOfBirth,
        gender: this.regForm.value.gender,
        countryCode: this.codeControl.value as string,
        phone: this.regForm.value.phone,
        citizenship: this.regForm.value.citizenship,
      });
    } else this.toastService.error('Please fill the form');
  }
}
