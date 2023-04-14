import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

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

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      // Navigate to Members page.
      next: _ => this.router.navigateByUrl('/members'),
      error: error => console.log(error)
    });
  }

  logout() {
    this.accountService.logout();
    // Navigate to Home page.
    this.router.navigateByUrl('/');
  }
}
