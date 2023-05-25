import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PassengersTypeEnum } from 'src/app/types/IPassengerConfig';
import { GetDateCurrencyFormatService } from 'src/app/services/get-date-currency-format.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IPassengerPrice } from '../../pages/summary/summary.component';

@UntilDestroy()
@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})
export class SummaryItemComponent implements OnInit, OnChanges {
  @Input() public quantity = 0;

  @Input() public type?: PassengersTypeEnum;

  @Input() public currentPrice?: IPassengerPrice;

  public price = 0;

  public currency = 'eur';

  public constructor(private dateCurrency: GetDateCurrencyFormatService) {}

  public ngOnInit(): void {
    this.setPrice();
    this.dateCurrency.dateCurrencyFormat$.pipe(untilDestroyed(this)).subscribe(({ currency }) => {
      this.currency = currency;
    });
  }

  public ngOnChanges({ currentPrice }: SimpleChanges): void {
    if (currentPrice) {
      this.setPrice();
    }
  }

  private setPrice() {
    if (this.type && this.currentPrice) {
      switch (this.type) {
        case PassengersTypeEnum.CHILDREN:
          this.price = this.currentPrice.children * this.quantity;
          break;
        case PassengersTypeEnum.INFANTS:
          this.price = this.currentPrice.infants * this.quantity;
          break;
        default:
          this.price = this.currentPrice.adults * this.quantity;
      }
    }
  }
}
