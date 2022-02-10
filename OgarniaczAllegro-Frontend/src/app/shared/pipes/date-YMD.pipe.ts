import { Pipe, PipeTransform } from '@angular/core';
import { IDateYMD } from '../../models/dateYMD';

@Pipe({
  name: 'myDate',
})
export class DateYMDPipe implements PipeTransform {
  transform(value: IDateYMD | undefined, ...args: any[]): string {
    if (!value) {
      return 'n/a';
    }

    return `${value?.year?.toString()}`
      + `-${value?.month?.toString().padStart(2, '0')}`
      + `-${value?.day?.toString().padStart(2, '0')}`
  }
}
