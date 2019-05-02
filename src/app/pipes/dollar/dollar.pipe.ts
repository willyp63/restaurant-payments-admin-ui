import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'dollar' })
export class DollarPipe implements PipeTransform {

  constructor(
    private readonly _currencyPipe: CurrencyPipe,
  ) {}

  transform(value: any): any {
    return this._currencyPipe.transform(value, 'USD', 'symbol', '1.2-2');
  }

}
