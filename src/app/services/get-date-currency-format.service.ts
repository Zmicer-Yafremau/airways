import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDateCurrencyFormat } from '../types/IDateCurrencyFormat';

@Injectable({
  providedIn: 'root',
})
export class GetDateCurrencyFormatService {
  public dateCurrencyFormat$ = new BehaviorSubject<IDateCurrencyFormat>({
    date: 'MM/DD/YYYY',
    currency: 'USD',
  });

  public changeFormat(value: IDateCurrencyFormat) {
    this.dateCurrencyFormat$.next(value);
  }
}
