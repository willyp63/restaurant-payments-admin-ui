import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private socket: SocketIOClient.Socket = io(environment.apiUrl);

  payForItem(itemId: string) {
    this.socket.emit('pay_for_item', { tableItemId: itemId });
  }

  onItemPaidFor(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('item_paid_for', (data: any) => observer.next(data.tableItemId));
    });
  }
}
