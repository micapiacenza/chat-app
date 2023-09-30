import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {HttpService} from "../http/http.service";
import {map} from "rxjs/operators";

const SERVER_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: Socket | undefined;

  constructor(private http: HttpService) {
    this.initSocket();
  }

  private initSocket(): void {
    this.socket = io(SERVER_URL);
    console.log('initSocket', this.socket);
  }

  sendMessage(message: string): void {
    console.log('Sending message!!!!', message);
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

  public joinGroup(groupId: string, userId: string): Observable<any> {
    const body = { userId:  userId }; // You need to provide the user's ID
    return this.http.post(`group/${groupId}/join`, body).pipe(map((e: any) => e.group));
  }

}
