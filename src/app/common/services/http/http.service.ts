import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) {}

  public delete(url: string) {
    return this.http.delete(this.baseUrl + url);
  }

  public get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  public post(url: string, body:any) {
    return this.http.post(this.baseUrl + url, body);
  }

  public put(url: string, body:any) {
    return this.http.put(this.baseUrl + url, body);
  }
}
