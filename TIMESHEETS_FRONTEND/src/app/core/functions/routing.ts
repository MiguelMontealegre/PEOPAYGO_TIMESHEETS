import { MenuItem } from '@models/layout/menu.model';
import { User } from '@models/account/user.model';
import { co } from '@fullcalendar/core/internal-common';
import { first } from 'lodash';
import { map } from 'lodash';

export function   getRouteByRole(user: User): string {
  const roleNames = map(user.roles, r => r.name);
  if (roleNames.includes('ADMIN')) {
    return '/admin/users';
  }
  if (
    roleNames.includes('CLIENT_USER')
  ) {
    const role = user.roles.find(x => x.name === 'CLIENT_USER');
    if (role) {
      return '/products/portal';
    }
  }
  return '/';
}

export function getMenuByRole(user: User): MenuItem[] {
  const menu: MenuItem[] = [];
  const roleNames = map(user.roles, r => r.name);
  if (roleNames.includes('ADMIN')) {
    menu.push({
      id: 1,
      label: 'Admin Panel',
      link: '/admin/users',
      icon: 'bx bx-grid-alt',
    });
  }
  if (
    roleNames.includes('CLIENT_USER')
  ) {
    const role = user.roles.find(x => x.name === 'CLIENT_USER');
    if (role) {
      menu.push({
        id: 1,
        label: 'Cliente Portal',
        link: '/products/portal',
        icon: 'bx bx-buildings',
      });
    }
  }

  return menu;
}
