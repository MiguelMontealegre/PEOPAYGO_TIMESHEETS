import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ClientCompany } from '@models/client-company/client-company.model';
import { ClientCompanyApiResolver } from '@resolvers/client-company-api.resolver';
import { ClientCompanyRoutingModule } from './client-company-routing.module';
import { CommonModule } from '@angular/common';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { EventService } from '@services/layout/event.service';
import { LayoutModule } from './modules/layout/layout.module';
import { LightboxModule } from 'ngx-lightbox';
import { ModelService } from '@services/common/model.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { WidgetModule } from '@modules/widget/widget.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientCompanyRoutingModule,
    NgApexchartsModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    UiSwitchModule,
    NgbModule,
    UiModule,
    WidgetModule,
    LayoutModule,
    LightboxModule,
    TranslateModule,
  ],
  providers: [
    EventService,
    ClientCompanyApiResolver,
    CommonVerbsApiService,
    {
      provide: 'ClientCompanyService',
      useFactory: () => new ModelService<ClientCompany>(),
    },
  ],
})
export class ClientCompanyModule {}
