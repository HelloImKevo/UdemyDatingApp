import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  registerForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          this.matchValues('password')
        ]
      ]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  registerNewUser() {
    console.log(this.registerForm?.value);

    // this.accountService.registerApi(this.model).subscribe({
    //   next: () => {
    //     // Close the 'Register' form.
    //     this.cancel();
    //   },
    //   error: error => {
    //     this.toastr.error(error.error);
    //     console.log(error);
    //   }
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
