import { Pipe, PipeTransform } from '@angular/core';

import { User } from 'src/app/models';

@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {

  transform(user: User): string {
    return this.transformFirstName(user.firstName) + ' ' + this.transformLastName(user.lastName);
  }

  private transformFirstName(firstName: string): string {
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  private transformLastName(lastName: string): string {
    return lastName.charAt(0).toUpperCase() + '.';
  }

}
