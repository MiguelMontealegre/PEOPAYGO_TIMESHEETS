import { AuthenticationService } from '@services/account/authentication.service';
import { BaseTopBarComponent } from '@components/abstract/base-top-bar.component';
import { AfterViewInit, Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { EventService } from '@services/layout/event.service';
import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { MenuItem } from '@models/layout/menu.model';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clientCompanyModules } from '@database/client-company-modules';
import { ThemeService } from '@services/layout/theme-service.service';
import { ClientCompany } from '@models/client-company/client-company.model';

@Component({
  selector: 'app-horizontaltopbar',
  templateUrl: './horizontaltopbar.component.html',
  styleUrls: ['./horizontaltopbar.component.scss'],
})
export class HorizontaltopbarComponent
  extends BaseTopBarComponent
  implements OnInit
{
  companyIdForNotifications: string | null;
  clientCompany: ClientCompany = this.route.snapshot.data.clientCompany;
  menuItems: MenuItem[] = clientCompanyModules;
  attribute: string;
  mode: string;
  TRANSLATE_KEY = 'MODEL_BOTS.MODULES.LAYOUT.COMPONENTS.HORIZONTALTOPBAR.';


  constructor(
    @Inject(DOCUMENT) document: InjectionToken<Document>,
    router: Router,
    languageService: LanguageService,
    cookiesService: CookieService,
    authenticationService: AuthenticationService,
    public _cookiesService: CookieService,
    private eventService: EventService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
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
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';


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

  changeLayout() {
   this.themeService.setLayout('vertical');
   this.eventService.broadcast('changeLayout', 'vertical');
  }

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.themeService.setTheme(themeMode);
  }
}
