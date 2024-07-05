import { ClientCompanyResolver } from '@resolvers/client-company.resolver';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: ListPageComponent,
  },
  {
    path: 'forms',
    children: [
      {
        path: ':id',
        component: FormPageComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetsRoutingModule { }
