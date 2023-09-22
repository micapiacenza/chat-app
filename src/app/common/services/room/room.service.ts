import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService extends HttpService{

  constructor( httpClient:HttpClient) {
    super(httpClient);
  }

  public listRoom(): Observable<any> {
    return this.get('group/list').pipe(map((e:any)=> e.rooms));
  }

  public createRoom(body: any): Observable<any>  {
    return this.put('group/create', body).pipe(map((e:any)=> e.rooms));
  }

  public getRoomById(id: string): Observable<any>  {
    return this.get('group/' + id).pipe(map((e:any)=> e.rooms));
  }

  public deleteRoom(id: string): Observable<any>  {
    return this.delete('group/' + id).pipe(map((e:any)=> e.rooms));
  }
}
