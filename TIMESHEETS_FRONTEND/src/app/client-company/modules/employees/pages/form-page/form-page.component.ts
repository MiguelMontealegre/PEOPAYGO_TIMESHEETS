import { Component, Inject, OnInit } from "@angular/core";

import { CommonApiService } from "@services/common/common-api.service";
import { CommonPageComponent } from "@components/abstract/common-page.component";
import { ModelService } from "@services/common/model.service";
import { map } from 'rxjs/operators';
import { ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { validate as uuidValidate } from 'uuid';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { Employee } from "@models/employee/employee.model";

@Component({
  selector: "app-forms-page",
  templateUrl: "./form-page.component.html",
  styleUrls: ["./form-page.component.scss"],
  providers: [
    { provide: 'API_SERVICE', useValue: 'employees' },
    CommonApiService,
    {
      provide: 'EmployeeService',
      useFactory: () => new ModelService<Employee>(),
    },
  ],
})
export class FormPageComponent extends CommonPageComponent implements OnInit {
  constructor(
    private api: CommonApiService,
    @Inject('EmployeeService')
    public employeeService: ModelService<Employee>,
    private route: ActivatedRoute
  ) {
    super('Employee', [
      { label: 'Client Company', route: '../../' },
      { label: 'Employees', route: '../' },
    ]);
  }

  ngOnInit(): void {
    const subscribe = this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          if (params.get('id') && uuidValidate(params.get('id') || '') && this.route.snapshot.data.clientCompany?.id !==  params.get('id')) {
            return params.get('id');
          }
          return null;
        }),
        tap(id => {
          if (id) {
            this.breadCrumbs.push({ label: 'Edit', active: true });
          } else {
            this.breadCrumbs.push({ label: 'Create', active: true });
          }
          this.employeeService.isLoading = true;
        }),
        switchMap(id => {
          return id
            ? this.api.get<Employee>(`/${id}`, { limit: 50, page: 1 },)
            : of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(model => {
        this.employeeService.isLoading = false;
        this.employeeService.set(model);
      });
    this.unsubscribe.push(subscribe);
  }
}
