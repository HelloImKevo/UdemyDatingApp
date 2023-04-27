import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Created with command:
 * ```
 * ng g component errors/server-error --skip-tests
 * ```
 */
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    // All of these can potentially be undefined - use optional chaining.
    this.error = navigation?.extras?.state?.['error'];
   }

  ngOnInit(): void {
  }
}
