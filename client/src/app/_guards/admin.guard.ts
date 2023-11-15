import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Created with command:
 * ```
 * ng g guard _guards/admin --skip-tests
 * -> CanActivate
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (!user) {
          return false;
        } else if (user.roles.includes('Admin')
          || user.roles.includes('Moderator')) {
          return true;
        } else {
          this.toastr.error('You cannot enter this area');
          return false;
        }
      })
    )
  }

  // Default NG auto-generated boilerplate:
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
