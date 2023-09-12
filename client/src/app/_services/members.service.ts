import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

/**
 * Created with command:
 * ```
 * ng g service _services/members --skip-tests
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.subscribe({
      next: loggedInUser => {
        if (loggedInUser) {
          this.userParams = new UserParams(loggedInUser);
          this.user = loggedInUser;
        } else {
          // Clear the member cache when the user is logged out (this should
          // also take effect after a new user has registered).
          this.memberCache = new Map();
        }
      }
    });
  }

  getUserParams(): UserParams | undefined {
    return this.userParams;
  }

  setUserParams(params: UserParams): void {
    this.userParams = params;
  }

  resetUserParams(): UserParams | undefined {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }

    return undefined;
  }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.http, this.baseUrl + 'users', params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    // Use the reduce() function to flatten multiple child arrays into one
    // mutable top-level array - as our cache grows, new member entities will
    // be added to the end of the array (rather than generating more sub-arrays).

    // Function documentation: Calls the specified callback function for all the
    // elements in an array. The return value of the callback function is the
    // accumulated result, and is provided as an argument in the next call to
    // the callback function.

    // Note that this approach will add "duplicate" entities to our single array,
    // so the results need be searched with a find() function.
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        // The spread (...) syntax allows an iterable, such as an array or string,
        // to be expanded in places where zero or more arguments (for function calls)
        // or elements (for array literals) are expected. In an object literal, the
        // spread syntax enumerates the properties of an object and adds the key-value
        // pairs to the object being created.
        this.members[index] = { ...this.members[index], ...member }
      })
    );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string): Observable<any> {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  removeLike(username: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number): Observable<PaginatedResult<Member[]>> {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return getPaginatedResult<Member[]>(this.http, this.baseUrl + 'likes', params);
  }
}
