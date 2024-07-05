import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/account/authentication.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { ModelService } from '@services/common/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { ClientCompany } from '@models/client-company/client-company.model';
import { Employee } from '@models/employee/employee.model';
import { PaymentType } from '@models/payment-types/payment-type.model';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'employees' },
    CommonApiService,
    CommonVerbsApiService,
  ],
})
export class EditFormComponent
  extends CommonFormComponent<Employee, Employee>
  implements OnInit {
  editing = false;
  employeeId: string | null = null;
  clientCompanyId: string | null = null;
  clientCompany: ClientCompany;
  updated = false;
  clientCompanies: any[] = [];
  initDataLoaded = false;

  paymentTypeOptions = [];

  constructor(
    private route: ActivatedRoute,
    @Inject('EmployeeService')
    private employeeService: ModelService<Employee>,
    builder: UntypedFormBuilder,
    api: CommonApiService,
    toastr: ToastrService,
    private api2: CommonVerbsApiService,
    private router: Router,
    private http: HttpClient,
    public authenticationService: AuthenticationService,
  ) {
    super(builder, api, toastr);
    this.group = this.builder.group({
      id: [null],
      name: ['', Validators.required],
      paymentAmount: [null, [Validators.required]],
      paymentTypeId: [null, [Validators.required]],
    });
    this.clientCompany = this.route.snapshot.data.clientCompany;
  }

  ngOnInit(): void {
    const subscribe = this.employeeService.model$.subscribe(employee => {
      if (employee) {
        this.init(employee);
      } else {
        this.loadClientCompanies();
      }
      this.initDataLoaded = true;
    });
    this.unsubscribe.push(subscribe);

    const paymentTypesApi = this.api2
      .get<PaymentType[]>('payment-types/all')
      .subscribe((r: PaymentType[]) => {
        this.paymentTypeOptions = r;
      });
    this.unsubscribe.push(paymentTypesApi);

    const subscribe1 = this.model$.subscribe(model => {
      if (model) {
        this.router
          .navigate(['client-company', model.clientCompany.id, 'employees', 'forms', model.id])
          .then();
      }
    });
    this.unsubscribe.push(subscribe1);

    const subscribeForm = this.submitEvent.subscribe(model => {
      if (model) {
        this.employeeService.set(model);
      }
    });
    this.unsubscribe.push(subscribeForm);
  }

  private loadClientCompanies() {
    this.clientCompanies = [{ id: this.route.snapshot.data.clientCompany!.id, name: this.route.snapshot.data.clientCompany!.name }]
  }

  get f() {
    return this.group.controls;
  }

  private init(employee: Employee) {
    this.editing = true;
    this.employeeId = employee.id;
    this.clientCompanyId = employee.clientCompany.id;
    this.group.patchValue({
      id: employee.id,
      name: employee.name,
      paymentAmount: employee.paymentAmount,
      paymentTypeId: employee.paymentType
    });
  }


  override ngSubmit(): void {
    this.submit = true;
    if (this.group.valid) {
      const body = this.group.getRawValue();
      const paymentType = this.group.controls['paymentTypeId'].value;
      body.uploadByUserId = this.authenticationService.authService.model.id;
      body.clientCompanyId = this.clientCompany.id;
      body.paymentTypeId = paymentType.id;
      const id = get(body, 'id', null);
      let subscribe: Observable<any>;
      let path = '/';
      if (id !== null) {
        path += `${id}`;
        subscribe = this.api.put<Employee>(path, body);
      } else {
        subscribe = this.api.post<Employee>(path, body);
      }
      subscribe.subscribe({
        complete: () => (this.submit = false),
        error: err => {
          this.toastr.error(
            err?.error?.message || err?.message || 'An error occurred.'
          );
        },
        next: response2 => {
          this.toastr.success('Changes applied.');
          this.subject$.next(response2);
          this.submitEvent.emit(response2);
          if (this.isCreateSubject$.value) {
            this.group.reset();
          }
          this.router.navigate([`client-company/${this.clientCompany.id}/employees`]);
        },
      });
    }
  }

}
