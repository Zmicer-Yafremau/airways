import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ToastService } from 'angular-toastify';
import { Validator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public regForm!: FormGroup;

  public hide = true;

  public agree = false;

  public codeControl = new FormControl('93' as ThemePalette);

  public constructor(public fb: FormBuilder, private toastService: ToastService) {}

  public ngOnInit(): void {
    this.regForm = this.fb.group({
      regEmail: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validator.nameValidator]],
      lastName: ['', [Validators.required, Validator.nameValidator]],
      phone: ['', [Validators.required, Validator.phoneValidator]],
      date: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  public getMailErrorMessage() {
    if (this.regForm.controls['regEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.controls['regEmail'].hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit() {
    this.toastService.error('Please fill the form');
    if (this.regForm.valid && this.agree) {
      this.toastService.success('Success');
    }
  }
}
