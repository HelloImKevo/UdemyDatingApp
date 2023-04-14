import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Created with command:
 * ```
 * ng g component register --skip-tests
 * ```
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerNewUser() {
    this.accountService.registerApi(this.model).subscribe({
      next: () => {
        // Close the 'Register' form.
        this.cancel();
      },
      error: error => {
        this.toastr.error(error.error);
        console.log(error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
