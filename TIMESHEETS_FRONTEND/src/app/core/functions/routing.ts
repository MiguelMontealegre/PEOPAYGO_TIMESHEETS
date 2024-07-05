import { MenuItem } from '@models/layout/menu.model';
import { User } from '@models/account/user.model';
import { map } from 'lodash';

export function getRouteByRole(user: User): string {
  const roleNames = map(user.roles, r => r.name);
  if (roleNames.includes('ADMIN')) {
    return '/admin/users';
  }
  if (
    roleNames.includes('CLIENT_USER')
  ) {
    const role = user.roles.find(x => x.name === 'CLIENT_USER');
    if (role) {
      if(!user.clientCompany){
        return `/account/profile/${user.id}/client-company-form`;
      } else {
        return `/client-company/${user.clientCompany.id}`;
      }
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

      if(!user.clientCompany){
        menu.push({
          id: 1,
          label: 'Cliente Portal',
          link: `/account/profile/${user.id}/client-company-form`,
          icon: 'bx bx-buildings',
        });
      } else {
        menu.push({
          id: 1,
          label: 'Cliente Portal',
          link: `/client-company/${user.clientCompany.id}`,
          icon: 'bx bx-buildings',
        });
      }
    }
  }

  return menu;
}
