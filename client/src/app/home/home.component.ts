import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { environment } from 'src/environments/environment';

/**
 * Created with command:
 * ```
 * ng g component home --skip-tests
 * ```
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  isDebugBuild: boolean = !environment.production

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }
}
