import { MenuItem } from '@models/layout/menu.model';

export const clientCompanyModules: MenuItem[] = [
  {
    id: 3,
    label: 'Employees',
    icon: 'bx-user-circle',
    link: './employees',
  },
  {
    id: 4,
    label: 'Timesheets',
    icon: 'bx-receipt',
    link: './timesheets',
  },
];
