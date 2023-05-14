import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { AppComponent } from './app.component';
import AppRoutingModule from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainSearchBoxComponent } from './components/main-component/main-search-box/main-search-box.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { PassengersOptionComponent } from './components/main-component/main-search-box/passengers-option/passengers-option.component';
import { MainComponent } from './components/main-component/main.component';
import { ProgressComponent } from './components/header/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainSearchBoxComponent,
    RegisterComponent,
    LoginComponent,
    AuthModalComponent,
    PassengersOptionComponent,
    MainComponent,
    ProgressComponent,
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    AngularToastifyModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    ToastService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '219709825646-f934aldkil4uk559gcmsg1csb5vhsgus.apps.googleusercontent.com',
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('567643935471543'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
