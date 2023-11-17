import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

/**
 * Directive classes, like component classes, can implement life-cycle hooks
 * to influence their configuration and behavior.
 * 
 * Created with command:
 * ```
 * ng g directive _directives/has-role
 * ```
 */
@Directive({
  selector: '[appHasRole]' // *appHasRole='["Admin", "Moderator"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
  }

  ngOnInit(): void {
    if (this.user.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      // User is not in the required roles. Remove the 'Admin' link from DOM.
      this.viewContainerRef.clear();
    }
  }
}
