import { Component, OnInit } from '@angular/core';
import { fromEvent } from "rxjs";

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 992) {
      this.toggleClick();
    }
    this.headerSticky();
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
