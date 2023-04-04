import { Component, OnInit } from '@angular/core';

/**
 * Created with command:
 * ```
 * ng g component nav --skip-tests
 * ```
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
  }
}
