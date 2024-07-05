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
import { Timesheet } from '@models/timesheets/timesheet.model';
import { Employee } from '@models/employees/employee.model';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'timesheets' },
    CommonApiService,
    CommonVerbsApiService,
  ],
})
export class EditFormComponent
  extends CommonFormComponent<Timesheet, Timesheet>
  implements OnInit {
  editing = false;
  timesheetId: string | null = null;
  timesheet: Timesheet;
  employeesData: Employee[];
  updated = false;


  statusItems = [
    {
      label: 'Pending',
      value: 'PENDING'
    },
    {
      label: 'Processed',
      value: 'PROCESSED'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    @Inject('TimesheetService')
    private timesheetService: ModelService<Timesheet>,
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
      status: [''],
      note: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const subscribe = this.timesheetService.model$.subscribe(timesheet => {
      if (timesheet) {
        this.init(timesheet);
      }
    });
    this.unsubscribe.push(subscribe);


    const subscribe1 = this.model$.subscribe(model => {
      if (model) {
        this.router
          .navigate(['admin', 'timesheets'])
          .then();
      }
    });
    this.unsubscribe.push(subscribe1);

    const subscribeForm = this.submitEvent.subscribe(model => {
      if (model) {
        this.timesheetService.set(model);
      }
    });
    this.unsubscribe.push(subscribeForm);
  }


  get f() {
    return this.group.controls;
  }


  private init(timesheet: Timesheet) {
    this.editing = true;
    this.timesheet = timesheet;
    this.timesheetId = timesheet.id;
    this.employeesData = timesheet.employeesTimesheetData?.map(item => item.employee),
    this.group.patchValue({
      id: timesheet.id,
      note: timesheet.note,
      status: timesheet.status,
    });
  }


  override ngSubmit(): void {
    this.submit = true;
    if (this.group.valid) {
      const body = this.group.getRawValue();
      body.status = this.group.controls['status'].value.value;
      const id = get(body, 'id', null);
      let subscribe: Observable<any>;
      let path = '/';
      if (id !== null) {
        path += `${id}/admin`;
        subscribe = this.api.put<Timesheet>(path, body);
      } else {
        subscribe = this.api.post<Timesheet>(path, body);
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
          this.router
          .navigate(['admin', 'timesheets'])
          .then();
        },
      });
    }
  }

}
