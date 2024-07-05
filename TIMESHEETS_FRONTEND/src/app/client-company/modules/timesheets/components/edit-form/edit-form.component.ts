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
import { PaymentType } from '@models/payment-types/payment-type.model';
import { Timesheet } from '@models/timesheets/timesheet.model';
import { NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from '@utils/custom-date-adapter';
import { CustomDateParserUsFormatter } from '@utils/custom-date-parser-formatter';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'timesheets' },
    CommonApiService,
    CommonVerbsApiService,
    { provide: NgbDateParserFormatter, useClass: CustomDateParserUsFormatter },
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
  ],
})
export class EditFormComponent
  extends CommonFormComponent<Timesheet, Timesheet>
  implements OnInit {
  editing = false;
  timesheetId: string | null = null;
  clientCompanyId: string | null = null;
  clientCompany: ClientCompany;
  updated = false;
  clientCompanies: any[] = [];
  initDataLoaded = false;

  paymentTypeOptions = [];


  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  checkDate: NgbDate | null = null;

  startDate = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    day: new Date().getDate(),
  };

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
    public formatter: NgbDateParserFormatter,
    private customAdapter: CustomDateAdapter
  ) {
    super(builder, api, toastr);
    this.group = this.builder.group({
      id: [null],
      title: ['', Validators.required],
      checkDate: [null, [Validators.required]],
      paymentPeriodStartDate: [null, [Validators.required]],
      paymentPeriodEndDate: [null, [Validators.required]],
    });
    this.clientCompany = this.route.snapshot.data.clientCompany;
  }

  ngOnInit(): void {
    const subscribe = this.timesheetService.model$.subscribe(timesheet => {
      if (timesheet) {
        this.init(timesheet);
      } else {
        this.loadClientCompanies();
      }
      this.initDataLoaded = true;
    });
    this.unsubscribe.push(subscribe);

    const paymentTypesApi = this.api2
      .get<PaymentType[]>('employees/all')
      .subscribe((r: PaymentType[]) => {
        this.paymentTypeOptions = r;
      });
    this.unsubscribe.push(paymentTypesApi);

    const subscribe1 = this.model$.subscribe(model => {
      if (model) {
        this.router
          .navigate(['client-company', model.clientCompany.id, 'timesheets', 'forms', model.id])
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


  onDateSelection(date: NgbDate, datepicker: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.group.patchValue({
        paymentPeriodStartDate: this.customAdapter.ngbDateToMomentFormat(this.fromDate),
        paymentPeriodEndDate: this.customAdapter.ngbDateToMomentFormat(this.toDate),
      });
      datepicker.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }


  onCheckDateSelection(date: NgbDate, datepicker: NgbInputDatepicker) {
    this.checkDate = date;
    this.group.patchValue({
      checkDate: this.customAdapter.ngbDateToMomentFormat(this.checkDate),
    });
    datepicker.close();
  }


  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }


  private loadClientCompanies() {
    this.clientCompanies = [{ id: this.route.snapshot.data.clientCompany!.id, name: this.route.snapshot.data.clientCompany!.name }]
  }

  get f() {
    return this.group.controls;
  }



  parseDateStringToNgbDate(dateString: string): NgbDateStruct {
    const datePart = dateString.split(' ')[0];
    const parts = datePart.split('-');
    return {
      year: +parts[0],
      month: +parts[1],
      day: +parts[2]
    };
  }


  private init(timesheet: Timesheet) {
    this.editing = true;
    this.timesheetId = timesheet.id;
    this.clientCompanyId = timesheet.clientCompany.id;
    this.group.patchValue({
      id: timesheet.id,
      title: timesheet.title,
      checkDate: timesheet.checkDate,
      paymentPeriodStartDate: timesheet.paymentPeriodStartDate,
      paymentPeriodEndDate: timesheet.paymentPeriodEndDate
    });
    const fromDateAux = this.parseDateStringToNgbDate(timesheet.paymentPeriodStartDate);
    const toDateAux = this.parseDateStringToNgbDate(timesheet.paymentPeriodEndDate);
    const checkDateAux = this.parseDateStringToNgbDate(timesheet.checkDate);
    this.fromDate = new NgbDate(fromDateAux.year, fromDateAux.month, fromDateAux.day);
    this.toDate = new NgbDate(toDateAux.year, toDateAux.month, toDateAux.day);
    this.checkDate = new NgbDate(checkDateAux.year, checkDateAux.month, checkDateAux.day);
  }


  override ngSubmit(): void {
    this.submit = true;
    console.log(this.group.getRawValue());
    if (this.group.valid) {
      const body = this.group.getRawValue();
      body.clientCompanyId = this.clientCompany.id;
      const id = get(body, 'id', null);
      let subscribe: Observable<any>;
      let path = '/';
      if (id !== null) {
        path += `${id}`;
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
          this.router.navigate([`client-company/${this.clientCompany.id}/timesheets`]);
        },
      });
    }
  }

}
