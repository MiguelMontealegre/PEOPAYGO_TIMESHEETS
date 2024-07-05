import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '@models/common/api-response.model';
import { AuthenticationService } from '@services/account/authentication.service';
import { CollectionComponent } from '@components/abstract/collection.component';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Timesheet } from '@models/timesheets/timesheet.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  providers: [
    CollectionService,
    { provide: 'API_SERVICE', useValue: 'timesheets' },
    CommonApiService,
  ],
})
export class ListPageComponent extends CollectionComponent<Timesheet> {
  breadCrumbs = [
    { label: 'Client Company', active: true },
    { label: 'Timesheets', active: true },
  ];



  editingStatus = false;
  editingIndex: number;
  editingData: any;
  originalStatus: string;

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
    router: Router,
    location: Location,
    api: CommonApiService,
    service: CollectionService<Timesheet>,
    private toastr: ToastrService,
    public authenticationService: AuthenticationService,
  ) {
    super(router, location, ``, api, service, 10, 'title', []);
  }

  editStatus(data: Timesheet ,index: number) {
    this.editingStatus = true;
    this.editingIndex = index;
    this.editingData = { ...data };
    this.originalStatus = data.status
  }

  cancelEdit() {
    this.editingStatus = false;
  }

  saveStatus(data: Timesheet) {
    if (data.status === this.originalStatus) {
      this.toastr.warning('No se realizaron cambios.');
      return;
    }

    this.api.put(`/${data.id}/admin`, data).subscribe(
      response => {
        this.toastr.success('Cambios Aplicados.');
        this.editingStatus = false;
      },
      error => {
        this.toastr.error(error?.error?.message || 'Ocurrió un error.');
        this.editingStatus = false;
        this.clear();
      }
    );

    this.editingStatus = false;
  }

  delete(model: Timesheet) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This action remove ${model.title}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#07B59A',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Confirm',
    }).then(result => {
      if (result.value) {
        this.api.delete<ApiResponse>(`/${model.id}`).subscribe(
          timesheetDeletion => {
            this.clear();
            this.toastr.success(timesheetDeletion?.message || 'Changes applied.');
          },
          errorDataSetDeletion => {
            this.toastr.error(
              errorDataSetDeletion?.error?.message || 'An error occurred.'
            );
          }
        );
      }
    });
  }
}
