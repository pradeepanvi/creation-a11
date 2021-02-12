import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent } from "rxjs";
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
declare var $: any;


@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  previousUrl: any;
  user: SocialUser;
  constructor(private render: Renderer2, private router: Router, private authService: SocialAuthService) {
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
    if (window.innerWidth < 992) {
      this.toggleClick();
    }
    this.onTapLogin();
    this.checkUser();
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

  onTapLogin() {
    $.getScript('https://apis.google.com/js/platform.js')
      .done(function (script: any, textStatus: any) {
        console.log(textStatus);
      })
      .fail(function () {
        console.log("Triggered ajaxError handler.");
      })
  }

  checkUser() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  }

}
