import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
