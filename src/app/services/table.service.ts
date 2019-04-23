import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table.model';
import { TableItem } from '../models/table-item.model';

@Injectable({ providedIn: 'root' })
export class TableService {

  constructor(private readonly http: HttpClient) { }

  getTables(): Observable<Table[]> {
    return this.http.get(`${environment.apiUrl}/table/all`) as Observable<Table[]>;
  }

  getTableById(tableId: string): Observable<Table> {
    return this.http.get(`${environment.apiUrl}/table/${tableId}`) as Observable<Table>;
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post(`${environment.apiUrl}/table/new`, table) as Observable<Table>;
  }

  removeTable(table: Table): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/table/${table._id}`) as Observable<Object>;
  }

  updateTable(tableId: string, table: Table): Observable<Table> {
    return this.http.patch(`${environment.apiUrl}/table/${tableId}`, table) as Observable<Table>;
  }

  addItemToTable(tableId: string, item: TableItem): Observable<TableItem> {
    return this.http.post(`${environment.apiUrl}/table/${tableId}/add-item`, item) as Observable<TableItem>;
  }
}
