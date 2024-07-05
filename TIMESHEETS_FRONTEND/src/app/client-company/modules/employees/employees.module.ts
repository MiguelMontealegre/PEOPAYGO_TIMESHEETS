import { NgbAccordionModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientCompanyResolver } from '@resolvers/client-company.resolver';
import { CommonModule } from '@angular/common';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { CoreModule } from 'src/app/core/core.module';
import { DayNamePipe } from 'src/app/core/pipes/week-days.pipe';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { Employee } from '@models/employee/employee.model';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { FormsModule } from '@angular/forms';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ModelService } from '@services/common/model.service';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';

@NgModule({
  declarations: [
    FormPageComponent, EditFormComponent, ListPageComponent, DayNamePipe
  ],
  imports: [
    EmployeesRoutingModule,
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    UiModule,
    NgbRatingModule,
    NgbAccordionModule,
    NgbModule,
    TranslateModule,
    NgbTimepickerModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [
    CommonVerbsApiService,
    ClientCompanyResolver,
    {
      provide: 'EmployeeService',
      useFactory: () => new ModelService<Employee>(),
    },
  ],
})
export class EmployeesModule { }
