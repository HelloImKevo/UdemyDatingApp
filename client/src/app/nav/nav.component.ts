import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Created with command:
 * ```
 * ng g component nav --skip-tests
 * ```
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // Was previously accessed in nav.component.html with [(ngModel)] directive.
  model: any = {};

  // This simply demonstrated the 'of' function with a default null value.
  // currentUser$: Observable<User | null> = of(null)

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      // Navigate to Members page.
      // Note: We're not showing the validation error 'Invalid Password'
      // for security reasons. We don't want a threat actor to know whether
      // a Username is valid.
      next: _ => {
        this.router.navigateByUrl('/members');
        // Clear the in-memory model that stores the username and password for
        // the NG Submit login form.
        this.model = {};
      }
    });
  }

  logout() {
    this.accountService.logout();
    // Navigate to Home page.
    this.router.navigateByUrl('/');
  }
}
