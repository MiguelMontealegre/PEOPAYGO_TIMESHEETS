import { MenuItem } from '@models/layout/menu.model';

export const dataModules: MenuItem[] = [
  {
    id: 1,
    label: 'Usuarios',
    icon: 'bx-collection',
    link: '/admin/users',
  },
  {
    id: 2,
    label: 'Timesheets',
    icon: 'bx-package',
    link: '/admin/timesheets',
  },
  {
    id: 3,
    label: 'Payment Types',
    icon: 'bx-package',
    link: '/admin/payment-types',
  },
];
