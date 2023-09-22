import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService extends HttpService{

  constructor( httpClient:HttpClient) {
    super(httpClient);
  }

  public listGroup(): Observable<any> {
    return this.get('group/list').pipe(map((e:any)=> e.groups));
  }

  public createGroup(body: any): Observable<any>  {
    return this.put('group/create', body).pipe(map((e:any)=> e.groups));
  }

  public getGroupById(id: string): Observable<any>  {
    return this.get('group/' + id).pipe(map((e:any)=> e.groups));
  }

  public deleteGroup(id: string): Observable<any>  {
    return this.delete('group/' + id).pipe(map((e:any)=> e.groups));
  }
}
