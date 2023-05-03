import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

/**
 * Created with command:
 * ```
 * ng g component members/member-card --skip-tests
 * ```
 * 
 * UI component that shows high-level details of a Member (User).
 */
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
