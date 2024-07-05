import { Component, OnInit } from '@angular/core';
import { BaseSidebarComponent } from '@components/abstract/base-sidebar.component';
import { clientCompanyModules } from '@database/client-company-modules';
import { EventService } from '@services/layout/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [EventService],
})
export class SidebarComponent extends BaseSidebarComponent implements OnInit {
  override ngOnInit(): void {
    this.menuItems = clientCompanyModules;


    const readUserRole = this.authenticationService.authService.model.roles.find(e => e.name === 'READ_USER');
    if(readUserRole && this.authenticationService.authService.model.roles.length === 1){
      this.menuItems = this.menuItems.filter(item => {
        if (item.label === 'Main Panel') {
          return true;
        } else if (item.subItems) {
          item.subItems = item.subItems.filter(subItem => subItem.label === 'Main Panel');
          return item.subItems.length > 0;
        }
        return false;
      });
    }
  }
}
