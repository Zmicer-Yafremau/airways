import { Component, OnInit } from '@angular/core';
import { PassengerType } from 'src/app/models/passenger-model';
import { ChangeStepService } from 'src/app/services/change-step.service';
import { GetUserRequestInfoService } from 'src/app/services/get-user-request-info.service';

@Component({
  selector: 'app-passengers-card',
  templateUrl: './passengers-card.component.html',
  styleUrls: ['./passengers-card.component.scss'],
})
export class PassengersCardComponent implements OnInit {
  public adults!: [PassengerType];

  public children!: [PassengerType];

  public infants!: [PassengerType];

  public constructor(private getUser: GetUserRequestInfoService, private stepService: ChangeStepService) {}

  public ngOnInit() {
    this.stepService.changeButtonStatus(true);
    console.log(`changed!`);
    this.getUser.userRequestInfo.subscribe((user) => {
      const values = Object.values(user.passengers);
      const adults = Array(values[0]).fill('adults') as [PassengerType];
      const children = Array(values[1]).fill('children') as [PassengerType];
      const infants = Array(values[2]).fill('infants') as [PassengerType];
      this.adults = adults;
      this.children = children;
      this.infants = infants;
    }); 
  }
}
