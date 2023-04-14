import { Component, OnInit } from '@angular/core';

/**
 * Created with command:
 * ```
 * ng g component messages --skip-tests
 * ```
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
