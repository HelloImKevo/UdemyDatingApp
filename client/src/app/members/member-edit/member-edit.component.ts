import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

/**
 * Created with command:
 * ```
 * ng g component members/member-edit --skip-tests
 * ```
 */
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member: Member | undefined;
  user: User | null = null;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.user = user
        this.loadMember();
      }
    })
  }

  ngOnInit(): void {
  }

  loadMember(): void {
    if (!this.user) {
      console.log("User is null - unable to load member details");
      return;
    }

    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(): void {
    console.log(this.member);
    this.toastr.success('Profile updated successfully');
    this.editForm?.reset(this.member);
  }
}
