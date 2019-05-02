import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket: SocketIOClient.Socket = io(environment.apiUrl);

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string, onEvent: Function) {
    this.socket.on(eventName, onEvent);
  }
  
}
