import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket: WebSocket = new WebSocket(environment.apiWsUrl);

  emit(eventName: string, data: any) {
    this.socket.send(JSON.stringify({ event: eventName, data }));
  }

  on(eventName: string, onEvent: Function) {
    this.socket.addEventListener('message', (event: MessageEvent) => {
      const eventData = JSON.parse(event.data);

      if (eventData['event'] === eventName) {
        onEvent(eventData['data']);
      }
    });
  }
  
}
