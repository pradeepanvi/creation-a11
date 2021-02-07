import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { fromEvent } from "rxjs";

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  previousUrl: any;
  constructor(private render: Renderer2, private router: Router) {
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

}
