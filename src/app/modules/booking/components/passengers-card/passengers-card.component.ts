import { Component, OnInit } from '@angular/core';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';

@Component({
  selector: 'app-passengers-card',
  templateUrl: './passengers-card.component.html',
  styleUrls: ['./passengers-card.component.scss'],
})
export class PassengersCardComponent implements OnInit {
  public adults!: [string];

  public children!: [string];

  public infants!: [string];

  public constructor(private getUser: GetUserRequestInfoService, private stepService: ChangeStepService) {}

  public ngOnInit() {
    this.stepService.changeButtonStatus(true);
    console.log(`changed!`);
    this.getUser.userRequestInfo.subscribe((user) => {
      const values = Object.values(user.passengers);
      const adults = Array(values[0]).fill('Adults') as [string];
      const children = Array(values[1]).fill('Children') as [string];
      const infants = Array(values[2]).fill('Infants') as [string];
      this.adults = adults;
      this.children = children;
      this.infants = infants;
    });
  }
}
