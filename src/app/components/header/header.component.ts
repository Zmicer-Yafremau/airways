import { Component } from '@angular/core';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public constructor (private matDialog: MatDialog){}
  public launhAuthDialog(){
    this.matDialog.open(LoginComponent, {
      width:'535px',
    })
  }
}
