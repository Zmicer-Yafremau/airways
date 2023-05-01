import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ValidatorsComponent } from 'src/app/shared/validators/validators.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends ValidatorsComponent implements OnInit {
  public regForm!: FormGroup;

  public hide = true;

  public agree = false;

  public codeControl = new FormControl('93' as ThemePalette);

  public constructor(public fb: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.regForm = this.fb.group({
      regEmail: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, super.nameValidator]],
      lastName: ['', [Validators.required, super.nameValidator]],
      phone: ['', [Validators.required, super.phoneValidator]],
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
    if (this.regForm.valid && this.agree) {
      alert('Success!');
    }
  }
}
