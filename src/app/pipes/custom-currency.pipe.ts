import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  public transform(value: string): string {
    if (value === 'rub') {
      return '₽';
    }

    if (value === 'pln') {
      return 'zł';
    }

    return value.toUpperCase();
  }
}
