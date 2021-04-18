import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from "rxjs";
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _globalService: GlobalService) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem("user");
    const source = timer(3000);
    if (user) {
      this._globalService.checkout(user);
      sessionStorage.removeItem("user");
    }
    source.subscribe(() => {
      this.router.navigate(['/'], { relativeTo: this.route });
    })
  }

}
