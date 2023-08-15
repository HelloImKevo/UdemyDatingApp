import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

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
  members: Member[] = [];
  pagination: Pagination | undefined;
  pageNumber: number = 1;
  pageSize: number = 12;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    });
  }

  pageChanged(event: any): void {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
