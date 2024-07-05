import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '@models/common/api-response.model';
import { AuthenticationService } from '@services/account/authentication.service';
import { CollectionComponent } from '@components/abstract/collection.component';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { Component } from '@angular/core';
import { Employee } from '@models/employee/employee.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  providers: [
    CollectionService,
    { provide: 'API_SERVICE', useValue: 'employees' },
    CommonApiService,
  ],
})
export class ListPageComponent extends CollectionComponent<Employee> {
  breadCrumbs = [
    { label: 'Client Company', active: true },
    { label: 'Employees', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    router: Router,
    location: Location,
    api: CommonApiService,
    service: CollectionService<Employee>,
    private toastr: ToastrService,
    public authenticationService: AuthenticationService,
  ) {
    super(router, location, ``, api, service, 10, 'name', [], [
      {
        key: 'clientCompanies',
        values: [route.snapshot.data.clientCompany!.id],
      }
    ]);
  }

  delete(model: Employee) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This action remove ${model.name} from Model Bot!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#07B59A',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirm',
    }).then(result => {
      if (result.value) {
        this.api.delete<ApiResponse>(`/${model.id}`).subscribe(
          dataSetDeletion => {
            this.clear();
            this.toastr.success(dataSetDeletion?.message || 'Changes applied.');
          },
          errorDataSetDeletion => {
            this.toastr.error(
              errorDataSetDeletion?.error.message || 'An error occurred.'
            );
          }
        );
      }
    });
  }
}
