import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

/**
 * Created with command:
 * ```
 * ng g service _services/admin --skip-tests
 * ```
 * 
 * Services are singletons, and they are instantiated when our
 * application starts and destroyed when our app shuts down.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }
}
