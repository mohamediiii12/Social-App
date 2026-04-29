import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',   // Apr
      day: 'numeric',   // 29
      hour: 'numeric',  // 12
      minute: '2-digit',// 54
      hour12: true      // PM
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

}
