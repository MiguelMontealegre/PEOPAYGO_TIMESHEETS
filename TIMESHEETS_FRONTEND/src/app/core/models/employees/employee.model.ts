import { ClientCompany } from "@models/client-company/client-company.model";
import { PaymentType } from "@models/payment-types/payment-type.model";

export interface Employee {
  id: string;
  name: string;

  paymentAmount: number;
  hours?: number,
  paymentType: PaymentType;
  clientCompany?: ClientCompany;

  createdAt: string;
  deletedAt?: string;
}

