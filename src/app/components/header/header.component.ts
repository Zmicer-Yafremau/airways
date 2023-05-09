import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName!: string;

  public userIsLogged!: boolean;

  public constructor(private matDialog: MatDialog, private authService: AuthService) {}

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
}
