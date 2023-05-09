import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isBookingUrl = false;

  public constructor(private matDialog: MatDialog, private router: Router) {
    this.toggleIsBookingUrl();
  }

  public openAuthDialog() {
    this.matDialog.open(AuthModalComponent);
  }

  private toggleIsBookingUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/booking') {
        this.isBookingUrl = true;
      } else if (event instanceof NavigationStart && event.url !== '/booking') {
        this.isBookingUrl = false;
      }
    });
  }
}
