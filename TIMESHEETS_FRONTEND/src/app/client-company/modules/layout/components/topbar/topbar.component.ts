import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { BaseTopBarComponent } from '@components/abstract/base-top-bar.component';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { MenuItem } from '@models/layout/menu.model';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@services/layout/event.service';
import { ThemeService } from '@services/layout/theme-service.service';
import { clientCompanyModules } from '@database/client-company-modules';
import { ClientCompany } from '@models/client-company/client-company.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent extends BaseTopBarComponent implements OnInit {
  menuItems: MenuItem[] = clientCompanyModules;
  clientCompany: ClientCompany = this.route.snapshot.data.clientCompany;

  hideSubMenuOptions: Array<string> = [];
  attribute: string;
  mode: string;
  TRANSLATE_KEY = 'MODEL_BOTS.MODULES.LAYOUT.COMPONENTS.HORIZONTALTOPBAR.';

  constructor(
    @Inject(DOCUMENT) document: any,
    router: Router,
    languageService: LanguageService,
    cookiesService: CookieService,
    authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    public _cookiesService: CookieService,
    private themeService: ThemeService,
    private eventService: EventService

  ) {
    super(
      document,
      router,
      languageService,
      cookiesService,
      authenticationService
    );
    this.cookieValue = this._cookiesService.get('lang');
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.attribute = this.themeService.getLayout();
    const modeAttribute = this.themeService.getTheme();
    this.themeService.setTheme(modeAttribute !== '' ? modeAttribute : 'light');
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';


    const readUserRole = this.authenticationService.authService.model?.roles?.find(e => e.name === 'READ_USER');
    if(readUserRole && this.authenticationService.authService.model?.roles?.length === 1){
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

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.themeService.setTheme(themeMode);
  }

  changeLayout() {
    this.themeService.setLayout('horizontal');
    this.eventService.broadcast('changeLayout', 'horizontal');
  }
}
