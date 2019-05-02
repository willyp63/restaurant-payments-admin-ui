import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Table } from 'src/app/models/table.model';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';

@Injectable({ providedIn: 'root' })
export class TableService {

  constructor(private readonly http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get(`${environment.apiUrl}/${API_ROUTES.Tables}`) as Observable<Table[]>;
  }

  getTableById(tableId: string): Observable<Table> {
    return this.http.get(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}`) as Observable<Table>;
  }

  addTable(table: Partial<Table>): Observable<Table> {
    return this.http.post(`${environment.apiUrl}/${API_ROUTES.Tables}`, table) as Observable<Table>;
  }

  removeTable(tableId: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}`) as Observable<Object>;
  }

  updateTable(tableId: string, table: Partial<Table>): Observable<Object> {
    return this.http.patch(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}`, table) as Observable<Object>;
  }

}
