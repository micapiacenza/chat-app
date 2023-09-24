import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) {}

  public listUsers() {
    return this.httpService.get('user/list').pipe(map((response: any) => response.users));
  }

  public getUserById(id: string) {
    return this.httpService.get(`user/${id}`).pipe(map((response: any) => response.user));
  }

  public assignRole(id: string, role: string) {
    return this.httpService.post(`user/${id}/assign/${role}`, {}).pipe(map((response: any) => response.user));
  }

  public deleteUser(id: string): Observable<any> {
    return this.httpService.delete(`user/${id}`).pipe(map((response: any) => response.user));
  }
}
