import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';

import { AuthenticationService } from '../../../core/services/account/authentication.service';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { CommonLoginComponent } from '@modules/authentication/common-login/common-login.component';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '@services/layout/event.service';
import { LanguageService } from '@services/layout/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ThemeService } from '@services/layout/theme-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@models/account/user.model';
import { environment } from '@environments/environment';
import { getRouteByRole } from '@functions/routing';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
    CommonApiService,
    LanguageService
  ],
})

/**
 * Crypto landing page
 */
export class HomePageComponent extends CommonComponent implements OnInit {
  externalAuthUrl = environment.api + '/external-auth/redirect';
  isLoggedIn = false;
  user: User;
  translatedText = '';
  // set the currenr year
  year: number = new Date().getFullYear();
  currentSection = 'home';
  cookieValue = '';

  carouselOption: OwlOptions = {
    items: 3,
    loop: true,
    margin: 40,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
    },
  }

  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive: {
      672: {
        items: 3
      },

      576: {
        items: 2
      },

      936: {
        items: 4
      },
    }
  }


  private _trialEndsAt;

  private _diff: number;
  _days: number;
  _hours: number;
  _minutes: number;
  _seconds: number;
  attribute: string;
  mode: string;


  animalsCategories = [
    {
      media: 'assets/images/animals/dog2.jpg',
      title: 'Perros'
    },
    {
      media: 'assets/images/animals/cat2.jpg',
      title: 'Gatos'
    },
    {
      media: 'assets/images/animals/bird2.jpg',
      title: 'Aves'
    },
    {
      media: 'assets/images/animals/rodent.jpg',
      title: 'Roedores'
    }
  ];


  testimonials = [
    {
      name: 'Viezh Robert',
      media: 'assets/images/users/avatarv2.jpg',
      place: 'Warsaw, Poland',
      content: '“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best”.',
      valoration: 4.5
    },
    {
      name: 'Viezh Robert',
      media: 'assets/images/users/avatarv2.jpg',
      place: 'Warsaw, Poland',
      content: '“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best”.',
      valoration: 4.5
    },
    {
      name: 'Viezh Robert',
      media: 'assets/images/users/avatarv2.jpg',
      place: 'Warsaw, Poland',
      content: '“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best”.',
      valoration: 4.5
    }
  ];

  countCart = 0;
  apiLoaded = false;
  key = environment.maps;
  center: google.maps.LatLngLiteral = { lat: 4.602713189186805, lng: -74.08392418343502 };
  zoomLevel?: number = 10;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markers1 = [
    {
      lat: 4.60149330902331,
      lng: -74.08055181535654,
    }
  ]
  markers2 = [
    {
      lat: 4.602713189186805,
      lng: -74.08392418343502,
    }
  ]

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    public authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private eventService: EventService,
    private toastr: ToastrService,
    private themeService: ThemeService,
    public languageService: LanguageService,
    public cookiesService: CookieService,
    public _cookiesService: CookieService,
    private sanitizer: DomSanitizer,
    private api: CommonApiService) {
    super();
    this.meta.addTag({
      name: 'description',
      content:
        `Designed to provide accurate and detailed information on a wide range of topics. This feature is based on two key components: Extensive Integrated Knowledge and Internet Search for Updated or Specific Information.
         Also Build your AI based on a personalized knowledge base, such files, web urls, videos.
         For companies Turn your customer questions into dynamic conversations, powered by the speed and precision of our AI `
    });
    this.title.setTitle(
      'Timesheets '
    );
    this.cookieValue = this.cookiesService.get('lang');
    const modeAttribute = this.themeService.getTheme();
    this.mode = modeAttribute !== '' ? modeAttribute : 'light';
  }

  ngOnInit() {
    this.authenticationService.isLoggedIn().then(next => {
      this.isLoggedIn = next;
      if (this.isLoggedIn) {
        const subscribe = of(this.authenticationService.authService.model)
          .pipe(
            switchMap(data =>
              data ? of(data) : this.authenticationService.getAccount()
            )
          )
          .subscribe(response => {
            if (response) {
              this.authenticationService.authService.set(response);

            } else {
              this.authenticationService.logout();
            }
          });
        this.unsubscribe.push(subscribe);
      }
    });


    this._trialEndsAt = "2022-12-31";

    interval(3000).pipe(
      map((x) => {
        this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
  }

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.themeService.setTheme(themeMode);
  }



  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('nav-sticky')
    }
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('topnav-menu-content').classList.toggle('show');
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  onOpenLoginModal() {
    this.modalService.open(CommonLoginComponent, { centered: true });
  }

  redirectToExternalAuth(key: string): void {
    window.location.href = this.externalAuthUrl + `?role=SINGLE_USER&provider=${key}`;
  }

  zoomChanged(level: number | undefined) {
    this.zoomLevel = level;
  }
  goWhosale(): void {

    if (this.isLoggedIn) {
      this.toastr.error('No puedes Registrarte como Mayorista, primero debes Cerrar la Session Actual ')
    } else {
      this.router.navigate(['./wholesale-form'])
    }
  }

  redirectTo() {
    if (this.authenticationService.authService.model) {
      this.router.navigate([getRouteByRole(this.authenticationService.authService.model)]).then();
    } else {
      this.router.navigate(['/account/auth/signup-2']).then();
    }
  }
}
