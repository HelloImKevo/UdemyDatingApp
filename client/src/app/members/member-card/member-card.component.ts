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
  // ViewEncapsulation alters how the Angular framework assigns
  // "global" IDs to HTML components in our client app. We could
  // potentially use this to apply global styles to ALL card components
  // across the application.
  // , encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
