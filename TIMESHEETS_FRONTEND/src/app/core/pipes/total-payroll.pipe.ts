import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '@models/employees/employee.model';

@Pipe({
  name: 'totalPayroll'
})
export class TotalPayrollPipe implements PipeTransform {

  transform(elems: Employee[]): number {
    if (elems == null) return 0;

    const totalValue = elems.reduce((sum, item) => {
      const value = item.paymentType?.name === "hour" && item.hours
      ? (item.paymentAmount * item.hours)
      : item.paymentAmount;


      return sum + value
    }, 0);


    return totalValue;
  }

}
