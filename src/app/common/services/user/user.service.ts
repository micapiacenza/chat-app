import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService{

  constructor( httpClient:HttpClient) {
    super(httpClient);
  }

  public listUsers(): Observable<any> {
    return this.get('user/list').pipe(map((e:any)=> e.users));
  }

  public createUser(body: any): Observable<any>  {
    return this.put('user/create', body).pipe(map((e:any)=> e.users));
  }

  public getUserById(id: string): Observable<any>  {
    return this.get('user/' + id).pipe(map((e:any)=> e.users));
  }

  public assignRole(id: string, role: string): Observable<any>  {
    return this.post('user/' + id + '/assign/' + role, {}).pipe(map((e:any)=> e.users));
  }

  public deleteUser(id: string): Observable<any>  {
    return this.delete('user/' + id).pipe(map((e:any)=> e.users));
  }
}
