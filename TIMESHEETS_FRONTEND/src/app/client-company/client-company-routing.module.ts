import { AuthGuard } from '../core/guards/auth.guard';
import { ClientCompanyApiResolver } from '@resolvers/client-company-api.resolver';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: LayoutComponent,
    resolve: {
      modelBot: ClientCompanyApiResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./modules/employees/employees.module').then(
            m => m.EmployeesModule
          ),
      },
      {
        path: 'timesheets',
        loadChildren: () =>
          import('./modules/timesheets/timesheets.module').then(
            m => m.TimesheetsModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientCompanyRoutingModule {}
