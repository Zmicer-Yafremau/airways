import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email!: string;

  public hide = true;

  public constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.email = user.email;
    });
  }
}
