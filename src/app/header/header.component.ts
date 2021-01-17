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
      // this.toggleClick();
    }
    this.headerSticky();
  }

  toggleClick() {
    // fromEvent(document.querySelector('.navbar-toggler'), 'click').subscribe((e) => {
    //   if (e.currentTarget.className.includes('collapsed')) {
    //     e.currentTarget.classList.remove('collapsed');
    //     document.querySelector('.navbar-collapse')?.classList.add('show');
    //   } else {
    //     e.currentTarget.classList.add('collapsed');
    //     document.querySelector('.navbar-collapse')?.classList.remove('show');
    //   }
    // })

    // fromEvent(document.querySelector('.navbar-collapse li a'), 'click').subscribe(() => {
    //   document.querySelector('.navbar-toggler')?.classList.add('collapsed');
    //   document.querySelector('.navbar-collapse')?.classList.remove('show');
    // })
  }

  headerSticky() {
    var header = document.querySelector('header');
    //Sticky header
    window.onscroll = function () {
      window.scrollY > 300
        ? header.classList.add('fixed')
        : header.classList.remove('fixed');
    };
  }

}
