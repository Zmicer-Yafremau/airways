import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  
  public isBookingUrl = false;
  
  public userName!: string;

  public userIsLogged!: boolean;

  public constructor(private matDialog: MatDialog, private authService: AuthService, private router: Router) {
    this.toggleIsBookingUrl();
  }

  public ngOnInit() {
    this.authService.userName.subscribe((name) => {
      this.userName = name;
    });
    this.authService.userIsLogged.subscribe((isLogged) => {
      this.userIsLogged = isLogged;
    });
  }

  public openAuthDialog() {
    this.matDialog.open(AuthModalComponent);
  }

  public logOut() {
    localStorage.clear();
    this.userName = '';
    this.userIsLogged = false;
  }
    
  private toggleIsBookingUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url.includes('/booking')) {
        this.isBookingUrl = true;
      } else if (event instanceof NavigationStart && !event.url.includes('/booking')) {
        this.isBookingUrl = false;
      }
    });
  }
}
