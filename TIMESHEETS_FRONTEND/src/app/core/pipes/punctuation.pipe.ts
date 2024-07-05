import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'punctuation'
})
export class PunctuationPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value == null) return '';

    const stringValue = typeof value === 'number' ? value.toString() : value;

    const parts = stringValue.split('.');
    let integerPart = parts[0];

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return '$ ' + integerPart;
  }

}
