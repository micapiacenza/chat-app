import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpService: HttpService) {
  }

  public listGroup(): Observable<any> {
    return this.httpService.get('group/list').pipe(map((e:any)=> e.groups));
  }

  public createGroup(body: any): Observable<any>  {
    return this.httpService.put('group/create', body).pipe(map((e:any)=> e.groups));
  }

  public getGroupById(id: string): Observable<any>  {
    return this.httpService.get('group/' + id).pipe(map((e:any)=> e.groups));
  }

  public deleteGroup(id: string): Observable<any>  {
    return this.httpService.delete('group/' + id).pipe(map((e:any)=> e.groups));
  }

  public joinGroup(groupId: string, userId: string | undefined): Observable<any> {
    const body = { userId };
    return this.httpService.post(`group/${groupId}/join`, body).pipe(map((e: any) => e.group));
  }

  public leaveGroup(groupId: string, userId: string): Observable<any> {
    const body = { userId };
    return this.httpService.post(`group/${groupId}/leave`, body).pipe(map((e: any) => e.group));
  }
}
