import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * Created with command:
 * ```
 * ng g service _services/busy --skip-tests
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class BusyService {

  public static LOADING_PROGRESS_INTERCEPTOR_MILLIS: number = 500;

  busyRequestCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy(): void {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    })
  }

  idle(): void {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
