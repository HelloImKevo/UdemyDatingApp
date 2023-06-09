import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

/**
 * Created with command:
 * ```
 * ng g service _services/account --skip-tests
 * ```
 * 
 * Services are singletons, and they are instantiated when our
 * application starts and destroyed when our app shuts down.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // Specify a "Union Type" of User or Null
  private currentUserSource = new BehaviorSubject<User | null>(null);
  // The sigil ($) is a convention for "An Observable"
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Calls the 'Login' API with the provided username and password.
   * 
   * @param model The username and password to attempt to log in to an
   * existing account.
   */
  login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  /**
   * Calls the 'Register New User' API.
   *
   * @param model The username and password to register as a new 'User'.
   */
  registerApi(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      // In RxJS, a projection function is a function that transforms the data
      // emitted by an Observable into a new form. A projection function can be
      // passed as a parameter to operators like `map`, `pluck`, `mergeMap`, and
      // others to modify the emitted data. They provide a way to manipulate
      // streams of data in a flexible and powerful way.
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        // We don't need the information returned from this projection function.
        // But if we wanted the user, we can add this:
        // return user;
      })
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
