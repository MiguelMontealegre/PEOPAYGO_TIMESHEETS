import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from '../core/guards/role.guard';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then(
            m => m.UsersModule
          ),
          canActivate: [RoleGuard],
          data: { roles: ['ADMIN'] }
      },
      {
        path: 'payment-types',
        loadChildren: () =>
          import('./modules/payment-types/payment-types.module').then(
            m => m.PaymentTypesModule,
          ),
          canActivate: [RoleGuard],
          data: { roles: ['ADMIN'] }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
