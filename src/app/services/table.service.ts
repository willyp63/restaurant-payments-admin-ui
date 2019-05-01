import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table.model';
import { TableItem } from '../models/table-item.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TableService {

  constructor(private readonly http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get(`${environment.apiUrl}/table`) as Observable<Table[]>;
  }

  getTableById(tableId: string): Observable<Table> {
    return this.http.get(`${environment.apiUrl}/table/${tableId}`) as Observable<Table>;
  }

  addTable(table: Partial<Table>): Observable<Table> {
    return this.http.post(`${environment.apiUrl}/table`, table) as Observable<Table>;
  }

  removeTable(tableId: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/table/${tableId}`) as Observable<Object>;
  }

  updateTable(tableId: string, table: Partial<Table>): Observable<Object> {
    return this.http.patch(`${environment.apiUrl}/table/${tableId}`, table) as Observable<Object>;
  }

  addItemToTable(tableId: string, item: Partial<TableItem>): Observable<TableItem> {
    return this.http.post(`${environment.apiUrl}/table/${tableId}/items`, item) as Observable<TableItem>;
  }

  addUserToTable(tableId: string, user: Partial<User>): Observable<User> {
    return this.http.post(`${environment.apiUrl}/table/${tableId}/users`, user) as Observable<User>;
  }

  getTableItems(tableId: string): Observable<TableItem[]> {
    return this.http.get(`${environment.apiUrl}/table/${tableId}/items`) as Observable<TableItem[]>;
  }

  getTableUsers(tableId: string): Observable<User[]> {
    return this.http.get(`${environment.apiUrl}/table/${tableId}/users`) as Observable<User[]>;
  }
}
