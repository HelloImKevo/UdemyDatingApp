import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

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

  constructor(private http: HttpClient, private presenceService: PresenceService) { }

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
    user.roles = [];
    // The JWT "role" property could be an array or just a single string.
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);

    this.presenceService.createHubConnection(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

    this.presenceService.stopHubConnection();
  }

  /**
   * Returns the "middle part" of a JWT (JSON Web Token), which
   * contains name and role information.
   */
  getDecodedToken(token: string): string | any {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
