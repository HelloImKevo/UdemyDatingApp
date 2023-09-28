import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { ToastrService } from 'ngx-toastr';

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
  messages: Message[] | undefined;
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  // TODO: The 'Unread' radio button may not be working, or messages are not being updated as "Read"
  loadMessages(): void {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    });
  }

  deleteMessage(id: number): void {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        // Remove the message element from our local array in the client.
        this.messages?.splice(this.messages.findIndex(m => m.id === id), 1);
        this.toastr.warning('Message deleted');
      }
    })
  }

  pageChanged(event: any): void {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
