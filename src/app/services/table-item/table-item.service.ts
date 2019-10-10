import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, merge, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { TableItem, TableItemPay } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { SOCKET_EVENTS } from 'src/app/constants/socket-events.constants';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';

@Injectable({ providedIn: 'root' })
export class TableItemService {

  constructor(
    private readonly http: HttpClient,
    private readonly socketService: WebsocketService
  ) { }

  updateTableItem(itemId: string, item: Partial<TableItem>): Observable<Object> {
    return this.http.patch(`${environment.apiUrl}/${API_ROUTES.TableItems}/${itemId}`, item) as Observable<Object>;
  }

  addItemToTable(tableId: string, item: Partial<TableItem>): void {
    const paylod: Partial<TableItem> = { ...item, tableId };
    this.socketService.emit(SOCKET_EVENTS.AddTableItem, paylod);
  }

  removeTableItem(itemId: string): void {
    const payload: Partial<TableItem> = { _id: itemId };
    this.socketService.emit(SOCKET_EVENTS.RemoveTableItem, payload);
  }

  getTableItems(tableId: string): Observable<TableItem[]> {
    return this.http.get(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}/${API_ROUTES.TableItems}`) as Observable<TableItem[]>;
    return merge(
      from([true]),
      this.onTableItemPaidFor(),
      this.onTableItemAdded(),
      this.onTableItemRemoved(),
    ).pipe(
      mergeMap(() => {
        return this.http.get(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}/${API_ROUTES.TableItems}`) as Observable<TableItem[]>;
      }),
    );
  }

  payForTableItems(tableItemId: string, userId: string) {
    const payload: TableItemPay = { tableItemId, userId };
    this.socketService.emit(SOCKET_EVENTS.PayForTableItem, payload);
  }

  onTableItemPaidFor(): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.on(SOCKET_EVENTS.TableItemPaidFor, () => observer.next());
    });
  }

  onTableItemAdded(): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.on(SOCKET_EVENTS.TableItemAdded, () => observer.next());
    });
  }

  onTableItemRemoved(): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.on(SOCKET_EVENTS.TableItemRemoved, () => observer.next());
    });
  }

}
