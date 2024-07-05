import { ClientCompany } from "@models/client-company/client-company.model";

export interface Timesheet {
  id: string;
  title: string;
  status: string;
  note: string;
  checkDate: string;
  paymentPeriodStartDate: string;
  paymentPeriodEndDate: string;
  clientCompany: ClientCompany;

  createdAt: string;
  deletedAt?: string;
}

