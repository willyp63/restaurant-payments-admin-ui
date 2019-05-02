import { DollarPipe } from './dollar.pipe';
import { CurrencyPipe } from '@angular/common';

describe('DollarPipe', () => {
  it('create an instance', () => {
    const pipe = new DollarPipe(new CurrencyPipe('en-US'));
    expect(pipe).toBeTruthy();
  });
});
