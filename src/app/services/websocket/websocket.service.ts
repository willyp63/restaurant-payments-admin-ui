import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket: WebSocket;
  private eventListeners: { [eventName: string]: Function[] } = {};

  emit(eventName: string, data: any) {
    if (!this.socket) { this.initSocket(); }

    this.socket.send(JSON.stringify({ event: eventName, data }));
  }

  on(eventName: string, onEvent: Function) {
    if (!this.socket) { this.initSocket(); }

    this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    this.eventListeners[eventName].push(onEvent);

    this.addEventListener(eventName, onEvent);
  }

  private addEventListener(eventName: string, onEvent: Function) {
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

    Object.keys(this.eventListeners).forEach(eventName => {
      this.eventListeners[eventName].forEach(onEvent => {
        this.addEventListener(eventName, onEvent);
      });
    });

    this.socket.onclose = () => {
      console.log('SOCKET CLOSED ON ITS OWN');
      this.initSocket();
    };
  }
  
}
