import { Employee } from "@models/employees/employee.model";

export interface EmployeeTimesheetData {
  id: string;
  employee: Employee;

  createdAt: string;
  deletedAt?: string;
}

