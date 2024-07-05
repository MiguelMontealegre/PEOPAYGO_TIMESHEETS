import { ClientCompany } from "@models/client-company/client-company.model";
import { EmployeeTimesheetData } from "@models/employees/employee-timesheet-data.model";

export interface Timesheet {
  id: string;
  title: string;
  status: string;
  note: string;
  checkDate: string;

  employeesTimesheetData: EmployeeTimesheetData[];

  paymentPeriodStartDate: string;
  paymentPeriodEndDate: string;
  clientCompany: ClientCompany;

  createdAt: string;
  deletedAt?: string;
}

