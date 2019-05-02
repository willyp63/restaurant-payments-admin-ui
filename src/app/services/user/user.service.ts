import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, merge, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { User, TableJoin } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { SOCKET_EVENTS } from 'src/app/constants/socket-events.constants';
import { TableItemService } from 'src/app/services/table-item/table-item.service';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private readonly http: HttpClient,
    private readonly socketService: WebsocketService,
    private readonly tableItemService: TableItemService,
  ) { }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post(`${environment.apiUrl}/${API_ROUTES.Users}`, user) as Observable<User>;
  }

  addUserToTable(tableId: string, user: Partial<User>) {
    const payload: TableJoin = { tableId, userId: user._id };
    this.socketService.emit(SOCKET_EVENTS.JoinTable, payload);
  }

  removeUserFromTable(tableId: string, user: Partial<User>) {
    const payload: TableJoin = { tableId, userId: user._id };
    this.socketService.emit(SOCKET_EVENTS.LeaveTable, payload);
  }

  onUserJoinedTable(): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.on(SOCKET_EVENTS.UserJoinedTable, () => observer.next());
    });
  }

  onUserLeftTable(): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.on(SOCKET_EVENTS.UserLeftTable, () => observer.next());
    });
  }

  getTableUsers(tableId: string): Observable<User[]> {
    return merge(
      from([1]),
      this.onUserJoinedTable(),
      this.onUserLeftTable(),
      this.tableItemService.onTableItemPaidFor(),
      this.tableItemService.onTableItemRemoved(),
    ).pipe(
      mergeMap(() => {
        return this.http.get(`${environment.apiUrl}/${API_ROUTES.Tables}/${tableId}/${API_ROUTES.Users}`) as Observable<User[]>;
      }),
    );
  }

}
