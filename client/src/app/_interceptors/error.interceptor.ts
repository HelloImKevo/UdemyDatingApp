import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Created with command:
 * ```
 * ng g interceptor _interceptors/error --skip-tests 
 * ```
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            // Base Request
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];

                // Traverse errors and populate our local array.
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }

                throw modelStateErrors.flat();
              } else {
                this.toastr.error(error.error, error.status.toString());
              }
              break;

            // Unauthorized
            case 401:
              this.toastr.error('Unauthorized', error.status.toString());
              break;

            // Not Found
            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            // Internal Server Error
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }

        throw error;
      }) // end: catchError
    );
  }
}
