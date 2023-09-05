import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

/**
 * Created with command:
 * ```
 * ng g component lists --skip-tests
 * ```
 */
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  predicate = 'liked';

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.memberService.getLikes(this.predicate).subscribe({
      next: response => {
        this.members = response;
      }
    })
  }
}
