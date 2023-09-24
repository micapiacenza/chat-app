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
}
