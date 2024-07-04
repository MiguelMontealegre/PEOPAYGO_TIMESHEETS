import { PaymentType } from '@models/payment-types/payment-type.model';
import { Profile } from '@models/account/profile.model';
import { RoleEntity } from './role-entity.model';

export interface User {
  id: string;
  name?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerifiedAt: null;
  emailConfirmedAt?: Date;
  rememberToken: string;
  roles: RoleEntity[];
  deletedAt: null;
  profile?: Profile;
  userId?: string;
  roleNames: string[];
  medias?: number;

  paymentAmount?: number;
  PaymentType?: PaymentType;


  updatedAt: Date;
  createdAt: Date;
}
