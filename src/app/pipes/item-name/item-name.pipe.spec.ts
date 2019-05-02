import { ItemNamePipe } from './item-name.pipe';
import { CurrencyPipe } from '@angular/common';

import { DollarPipe } from 'src/app/pipes/dollar/dollar.pipe';

describe('ItemNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ItemNamePipe(new DollarPipe(new CurrencyPipe('en-US')));
    expect(pipe).toBeTruthy();
  });
});
