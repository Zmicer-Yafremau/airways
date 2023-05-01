import { Component } from '@angular/core';
import { RegisterComponent } from 'src/app/modules/auth-modal/components/register/register.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public constructor(private matDialog: MatDialog) {}

  public openAuthDialog() {
    this.matDialog.open(RegisterComponent);
  }
}
