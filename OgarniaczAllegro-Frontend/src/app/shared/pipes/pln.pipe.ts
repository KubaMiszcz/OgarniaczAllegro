import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plnPipe',
})
export class PlnPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    if (!value) {
      return 'n/a';
    }

    return (Math.round(value * 100) / 100).toFixed(2) + ' zł';
  }
}
