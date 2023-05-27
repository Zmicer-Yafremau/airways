import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email!: string;

  public hide = true;

  public logForm!: FormGroup;

  public constructor(
    private authService: AuthService,
    private toastService: ToastService,
    public fb: FormBuilder,
  ) {}

  public ngOnInit() {
    this.logForm = this.fb.group({
      logEmail: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });
    this.authService.user.subscribe((user) => {
      this.logForm.setValue({
        logEmail: user.email,
        pass: this.logForm.value.pass,
      });
    });
  }

  public onSubmit() {
    if (this.logForm.valid) {
      this.authService.getLogToken({
        email: this.logForm.value.logEmail,
        password: this.logForm.value.pass.trim(),
      });
    } else this.toastService.error('Please fill the form');
  }
}
