import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private httpService: HttpService) {}

  public listRooms(): Observable<any> {
    return this.httpService.get('room/list').pipe(map((response: any) => response.rooms));
  }

  public createRoom(groupId: string, body: any): Observable<any> {
    return this.httpService.post(`room/create/${groupId}`, body).pipe(map((response: any) => response.room));
  }

  public getRoomById(id: string): Observable<any> {
    return this.httpService.get('room/' + id).pipe(map((response: any) => response.room));
  }

  public deleteRoom(id: string): Observable<any> {
    return this.httpService.delete('room/' + id).pipe(map((response: any) => response.room));
  }

  public getRoomUsers(id: string): Observable<any> {
    return this.httpService.get('room/' + id + '/users').pipe(map((response: any) => response.users));
  }

  public addUsersToRoom(roomId: string, userIds: string[]): Observable<any> {
    const body = { userIds };
    return this.httpService.put('room/' + roomId + '/add-user', body).pipe(map((response: any) => response.room));
  }

  public sendJoinRequest(roomId: string): Observable<any> {
    return this.httpService.post('room/' + roomId + '/join', {}).pipe(map((response: any) => response.joinRequest));
  }
}
