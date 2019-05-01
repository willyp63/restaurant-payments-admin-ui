import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastName'
})
export class LastNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.charAt(0).toUpperCase() + '.';
  }

}
