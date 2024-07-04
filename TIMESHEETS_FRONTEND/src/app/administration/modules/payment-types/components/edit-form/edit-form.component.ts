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
import { Media } from '@models/media/media.model';
import { PaymentType } from '@models/payment-types/payment-type.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'payment-types' },
    CommonApiService,
    CommonVerbsApiService,
  ],
})
export class EditFormComponent
  extends CommonFormComponent<PaymentType, PaymentType>
  implements OnInit {
  editing = false;
  paymentTypeId: string | null = null;
  media: Media[] = [];


  updated = false;
  initDataLoaded = false;
  TRANSLATE_KEY = 'MODEL_BOTS.MODULES.CRON-JOBS.COMPONENTS.EDIT-FORM.'

  constructor(
    private route: ActivatedRoute,
    @Inject('PaymentTypeService')
    private paymentTypeService: ModelService<PaymentType>,
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
    });
  }

  ngOnInit(): void {
    const subscribe = this.paymentTypeService.model$.subscribe(paymentType => {
      if (paymentType) {
        this.init(paymentType);
      }
      this.initDataLoaded = true;
    });
    this.unsubscribe.push(subscribe);

    const subscribeForm = this.submitEvent.subscribe(model => {
      if (model) {
        this.paymentTypeService.set(model);
      }
    });
    this.unsubscribe.push(subscribeForm);
  }


  get f() {
    return this.group.controls;
  }

  private init(paymentType: PaymentType) {
    this.editing = true;
    this.paymentTypeId = paymentType.id;
    this.group.patchValue({
      id: paymentType.id,
      name: paymentType.name,
    });
  }


  override ngSubmit(): void {
    this.submit = true;
    if (this.group.valid) {
      const body = this.group.getRawValue();
      body.uploadByUserId = this.authenticationService.authService.model.id;
      const id = get(body, 'id', null);
      let subscribe: Observable<any>;
      let path = '/';
      if (id !== null) {
        path += `${id}`;
        subscribe = this.api.put<PaymentType>(path, body);
      } else {
        subscribe = this.api.post<PaymentType>(path, body);
      }
      subscribe.subscribe({
        complete: () => (this.submit = false),
        error: err => {
          this.toastr.error(
            err?.error?.message || err?.message || 'An ocurrido un Error.'
          );
        },
        next: response2 => {
          this.toastr.success('Cambios Aplicados');
          this.subject$.next(response2);
          this.submitEvent.emit(response2);
          if (this.isCreateSubject$.value) {
            this.group.reset();
          }
          this.router.navigate([`admin/payment-types`]);
        },
      });
    }
  }
}
