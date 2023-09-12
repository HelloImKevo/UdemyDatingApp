import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../_models/pagination";
import { Observable, map } from "rxjs";

export function getPaginatedResult<T>(
  http: HttpClient,
  url: string,
  params: HttpParams
): Observable<PaginatedResult<T>> {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;

  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      if (response.body) {
        paginatedResult.result = response.body;
      }

      const pagination = response.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }

      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber);
  params = params.append('pageSize', pageSize);

  return params;
}
