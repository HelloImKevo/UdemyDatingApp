import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

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
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          this.paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }

        return this.paginatedResult;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName === username);
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
}
