import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

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

  constructor(private memberService: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService) { }

  ngOnInit(): void {
  }

  /**
   * Marks a target user as "Liked". If the user is already "Liked", then
   * an error will be shown as a Toast.
   * 
   * @param member The target member to like.
   */
  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    })
  }

  /**
   * Un-likes the target user. If the user hasn't already been "Liked", then
   * an error will be shown as a Toast.
   * 
   * @param member The target member to un-like.
   */
  removeLike(member: Member) {
    this.memberService.removeLike(member.userName).subscribe({
      next: () => this.toastr.warning('You have un-liked ' + member.knownAs)
    })
  }
}
