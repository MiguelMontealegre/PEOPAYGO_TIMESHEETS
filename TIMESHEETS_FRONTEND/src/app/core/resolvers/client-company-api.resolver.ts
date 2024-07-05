import { ActivatedRouteSnapshot } from '@angular/router';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs';
import { ClientCompany } from '@models/client-company/client-company.model';

@Injectable()
export class ClientCompanyApiResolver implements Resolve<ClientCompany | null> {
  constructor(
    @Inject('ClientCompanyService')
    public clientCompanyService: ModelService<ClientCompany>,
    private service: CommonVerbsApiService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientCompany | null> {
    const id = route.params.id || route.data.id;
    return this.service
      .get<ClientCompany>(`client-companies/${id}`, {}, [])
      .pipe(
        tap(response => {
          this.clientCompanyService.set(response);
        }),
        catchError(error => {
          this.router.navigate(['/404']).then();
          return of(null);
        })
      );
  }
}
