import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent } from "rxjs";
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GlobalService } from '../shared/global.service';
declare var $: any;


@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  previousUrl: any;
  user: any;
  showDropDownClass = false;
  constructor(private render: Renderer2, private router: Router, private authService: SocialAuthService, private globalService: GlobalService) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          //for current page name
          let currentUrlSlug = event.url.slice(1);
          let currentUrlSlug2 = 'fixed-inner';
          console.log(currentUrlSlug);
          if (this.previousUrl) {
            this.render.removeClass(document.querySelector('header'), currentUrlSlug2);
            this.render.removeClass(document.querySelector('header'), 'd-none');
            this.headerSticky();
          }
          if (currentUrlSlug && currentUrlSlug.includes('#') != true) {
            this.render.addClass(document.body, currentUrlSlug);
            this.render.addClass(document.querySelector('header'), currentUrlSlug2);
          }
          if (currentUrlSlug.includes('admin')) {
            this.render.addClass(document.querySelector('header'), 'd-none');
            this.render.addClass(document.querySelector('footer'), 'd-none');
          }
          this.previousUrl = currentUrlSlug;
        }
      }
    )
  }

  ngOnInit(): void {
    this.headerSticky();
    if (window.innerWidth < 992) {
      this.toggleClick();
    }
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      this.user = JSON.parse(userData);
      this.globalService.checkUser(this.user);
    } else {
      this.checkUser();
    }
  }

  toggleClick() {
    let navbarToggler = document.querySelector('.navbar-toggler') as HTMLButtonElement;
    let navbarLink = document.querySelectorAll('.navbar-collapse li a') as any;
    fromEvent(navbarToggler, 'click').subscribe((e) => {
      if (navbarToggler.className.includes('collapsed')) {
        navbarToggler.classList.remove('collapsed');
        document.querySelector('.navbar-collapse')?.classList.add('show');
      } else {
        navbarToggler.classList.add('collapsed');
        document.querySelector('.navbar-collapse')?.classList.remove('show');
      }
    })

    fromEvent(navbarLink, 'click').subscribe(() => {
      setTimeout(() => {
        document.querySelector('.navbar-toggler')?.classList.add('collapsed');
        document.querySelector('.navbar-collapse')?.classList.remove('show');
      }, 500)
    })
  }

  headerSticky() {
    var header = document.querySelector('header') as HTMLDivElement;
    //Sticky header
    window.onscroll = function () {
      window.scrollY > 300
        ? header.classList.add('fixed')
        : header.classList.remove('fixed');
    };
  }

  checkUser() {
    this.authService.authState.subscribe((user) => {
      sessionStorage.setItem("userData", JSON.stringify(user));
      this.user = user;
      this.globalService.checkUser(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }
  signOut(): void {
    this.showDropDownClass = false;
    this.authService.signOut();
  }

  showDropdown() {
    if (this.showDropDownClass) {
      this.showDropDownClass = false;
    } else {
      this.showDropDownClass = true;
    }
  }

}
