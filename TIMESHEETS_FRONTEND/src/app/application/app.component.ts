import { Component, OnInit } from '@angular/core';

import { CommonApiService } from '@services/common/common-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
    CommonApiService,
  ],
})
export class AppComponent  {
  constructor(
   private api :CommonApiService
  ) {}
}
