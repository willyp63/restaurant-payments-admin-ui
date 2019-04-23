import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableItem } from '../models/table-item.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableItemService {

  constructor(private readonly http: HttpClient) { }

  removeTableItem(item: TableItem): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/table-item/${item._id}`) as Observable<Object>;
  }

  updateTableItem(itemId: string, item: TableItem): Observable<TableItem> {
    return this.http.patch(`${environment.apiUrl}/table-item/${itemId}`, item) as Observable<TableItem>;
  }
}
