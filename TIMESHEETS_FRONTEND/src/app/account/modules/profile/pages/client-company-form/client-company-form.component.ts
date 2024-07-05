import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { getMenuByRole } from '@functions/routing';
import { User } from '@models/account/user.model';
import { ClientCompany } from '@models/client-company/client-company.model';
import { MenuItem } from '@models/layout/menu.model';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { ModelService } from '@services/common/model.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-company-form',
  templateUrl: './client-company-form.component.html',
  styleUrls: ['./client-company-form.component.scss']
})
export class ClientCompanyFormComponent extends CommonFormComponent<ClientCompany, ClientCompany> implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  addClientCompanyForm: UntypedFormGroup = this.builder.group({
    name: ['', [Validators.pattern(/^[A-Za-z0-9\s\-.,()]+$/),Validators.required]],
  });
  user: User = this.route.snapshot.data.user;

  constructor(
    builder: UntypedFormBuilder,
    api: CommonVerbsApiService,
    toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('MemberService')
    public memberService: ModelService<User>,
    @Inject('MenuService')
    public menuService: ModelService<MenuItem[]>,
    @Inject('AuthService')
    public authService: ModelService<User>,
  ) {
    super(builder, api, toastr);
  }

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
  }

  get f() {
    return this.addClientCompanyForm.controls;
  }

  addClientCompany() {
    this.submit = true;
    if (this.addClientCompanyForm.valid) {
      const formControls = this.addClientCompanyForm.controls;
      const addClientCompanyBody = {
        name: formControls.name.value,
        userId: this.user.id
      };
      this.api.post<any>('client-companies', addClientCompanyBody).subscribe(
        response => {
          const bot = response[0];
          const updatedUser = response[1];
          this.toastr.success('Changes applied.');
          this.memberService.set(updatedUser);
          this.authService.set(updatedUser);
          this.menuService.set(getMenuByRole(updatedUser));
          console.log('getttt3333');
          this.router.navigate([`/client-company/${updatedUser.clientCompany.id}`]).then();
        },
        errorAddedClientCompany => {
          this.toastr.error(
            errorAddedClientCompany?.error.message || 'An error occured.'
          );
        }
      );
    }
  }

  override ngClassValidate(group: UntypedFormGroup, name: string): string {
    if (!this.submit) return '';
    return group.controls[name].errors ? 'is-invalid' : 'is-valid';
  }
}
