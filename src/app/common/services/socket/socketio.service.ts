import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {HttpService} from "../http/http.service";
import {map} from "rxjs/operators";
import {MessageInterface} from "../../interfaces/message.interface";

const SERVER_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: Socket | undefined;
  messages:MessageInterface[] = <MessageInterface[]>[];

  constructor(private http: HttpService) {
    this.initSocket();
  }

  private initSocket(): void {
    this.socket = io(SERVER_URL);
    console.log('initSocket', this.socket);
  }

  sendMessage(message: string): void {
    console.log('Sending message fe', message);
    this.socket?.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket?.on('message', (message: string) => {
        console.log('Received message fe', message);
        observer.next(message);
      });
    });
  }

  public joinRoom(room: string):void{
    console.log('joinRoom service', room);
    this.socket?.emit("joinRoom", room);
  }
  public leaveRoom(selectedRoom: string):void{
    this.socket?.emit("leaveRoom", selectedRoom);
  }

  public requestRoomList(){
    this.socket?.emit('roomList','list please');
  }

  public getRoomList(next:any){
    this.socket?.on('roomList',res=>next(res));

  }

}
