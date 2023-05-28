import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {
  public user!: SocialUser;

  public loggedIn!: boolean;

  public constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    this.socialAuthService.authState.subscribe(
      (user) => {
        if (user) {
          this.user = user;
          this.loggedIn = user != null;
          this.authService.setUser({
            firtsName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
          });
        } else this.socialAuthService.signOut();
      },
      (err) => {
        console.log(err.error.message);
      },
    );
  }

  public signInWithFB(): void {
    this.socialAuthService.signOut();
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((err) => {
      console.log(err.error.message);
    });
  }
}
