import { ActivatedRouteSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ClientCompany } from '@models/client-company/client-company.model';

@Injectable()
export class ClientCompanyResolver implements Resolve<ClientCompany> {
  constructor(
    @Inject('ClientCompanyService')
    private service: ModelService<ClientCompany>,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientCompany> {
    return this.service.model$.pipe(
      //debounceTime(200),
      filter(x => x !== null && x !== undefined),
      map(r => r!)
    );
  }
}
