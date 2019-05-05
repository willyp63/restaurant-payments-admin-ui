import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket: WebSocket;

  emit(eventName: string, data: any) {
    if (!this.socket) { this.initSocket(); }

    this.socket.send(JSON.stringify({ event: eventName, data }));
  }

  on(eventName: string, onEvent: Function) {
    if (!this.socket) { this.initSocket(); }

    this.socket.addEventListener('message', (event: MessageEvent) => {
      const eventData = JSON.parse(event.data);

      if (eventData['event'] === eventName) {
        onEvent(eventData['data']);
      }
    });
  }

  private initSocket() {
    console.log('INIT SOCKET');
    this.socket = new WebSocket(environment.apiWsUrl);
    this.socket.onclose = () => {
      console.log('SOCKET CLOSED ON ITS OWN');
      setTimeout(this.initSocket, 500);
    };
  }
  
}
