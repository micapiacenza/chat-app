import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: Socket | undefined;

  constructor() {
    this.initSocket();
  }

  private initSocket(): void {
    this.socket = io(SERVER_URL, { transports: ['websocket'] });
  }

  sendMessage(message: string): void {
    console.log('Sending message:', message);
    this.socket?.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket?.on('message', (message: string) => {
        console.log('Received message:', message);
        observer.next(message);
      });
    });
  }

}
