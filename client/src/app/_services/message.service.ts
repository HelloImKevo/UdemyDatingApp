import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

/**
 * Created with command:
 * ```
 * ng g service _services/message --skip-tests
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * @param container Example: "Inbox", "Outbox" or "Unread".
   * @returns An observable of Paginated Messages.
   */
  getMessages(
    pageNumber: number,
    pageSize: number,
    container: string
  ): Observable<PaginatedResult<Message[]>> {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('container', container);

    return getPaginatedResult<Message[]>(this.http, this.baseUrl + 'messages', params);
  }

  getMessageThread(username: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }
}
