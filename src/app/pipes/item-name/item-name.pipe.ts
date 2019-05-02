import { Pipe, PipeTransform } from '@angular/core';

import { TableItem } from 'src/app/models';
import { DollarPipe } from 'src/app/pipes/dollar/dollar.pipe';

@Pipe({ name: 'itemName' })
export class ItemNamePipe implements PipeTransform {

  constructor(
    private readonly _dollarPipe: DollarPipe,
  ) {}

  transform(item: TableItem): string {
    return `${item.name} (${this._dollarPipe.transform(item.price)})`;
  }

}
