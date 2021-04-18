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
    if (this._globalService.user) {
      this._globalService.checkout();
    }
    const source = timer(3000);
    source.subscribe(() => {
      this.router.navigate(['/'], { relativeTo: this.route });
    })
  }

}
