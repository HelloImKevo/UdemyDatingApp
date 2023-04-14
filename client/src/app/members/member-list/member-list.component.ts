import { Component, OnInit } from '@angular/core';

/**
 * Created with command:
 * ```
 * ng g component members/member-list --skip-tests
 * ```
 */
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
