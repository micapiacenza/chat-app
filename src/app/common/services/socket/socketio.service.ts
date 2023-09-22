import {Injectable} from '@angular/core';
import {DefaultEventsMap} from '@socket.io/component-emitter';
// import {io, Socket} from 'socket.io-client';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  public websocketUrl = 'ws://localhost:3001/ws';

  // socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {
  }

  setupSocketConnection() {
    // this.socket = io(this.websocketUrl);
    const ws = new WebSocket(this.websocketUrl);
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer);
          resolve(ws);
        }
      }, 10);
    });
  }

  getOrCreateCursorFor(messageBody: any): void {
    const sender = messageBody.sender;
    console.log(sender, messageBody);
  }
}
