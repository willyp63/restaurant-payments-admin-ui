import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket: WebSocket;
  private eventListeners: { [eventName: string]: Function[] } = {};

  emit(eventName: string, data: any) {
    this.getSocket().send(JSON.stringify({ event: eventName, data }));
  }

  on(eventName: string, onEvent: Function) {
    // save refs to arguments
    this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    this.eventListeners[eventName].push(onEvent);

    this.addEventListener(eventName, onEvent);
  }

  private addEventListener(eventName: string, onEvent: Function) {
    this.getSocket().addEventListener('message', (event: MessageEvent) => {
      const eventData = JSON.parse(event.data);

      if (eventData['event'] === eventName) {
        onEvent(eventData['data']);
      }
    });
  }

  private getSocket(): WebSocket {
    if (!this.socket) { this.initSocket(); }
    return this.socket;
  }

  private initSocket() {
    console.log('Initializing new WebSocket connectionn...');
    this.socket = new WebSocket(environment.apiWsUrl);

    // add eventlisteners from old socket to new socket
    Object.keys(this.eventListeners).forEach(eventName => {
      this.eventListeners[eventName].forEach(onEvent => {
        this.addEventListener(eventName, onEvent);
      });
    });

    // reopen socket if it closes on its own
    this.socket.onclose = () => {
      console.log('WebSocket closed on its own...');
      this.initSocket();
    };
  }
  
}
