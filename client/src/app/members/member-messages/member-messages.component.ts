import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';

/**
 * Created with command:
 * ```
 * ng g component members/member-messages --skip-tests
 * ```
 */
@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  // Input decorator must be specified in HTML. Ex: [username]="member.userName"
  @Input() username?: string;
  // Ex: [messages]="messages"
  @Input() messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
