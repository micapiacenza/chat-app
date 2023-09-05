import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // Create a new group
  createGroup(groupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-group`, groupData);
  }

  // Get all groups
  getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/groups`);
  }

  // Get a specific group by ID
  getGroupById(groupId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${groupId}`);
  }

  // Update a group by ID
  updateGroup(groupId: number, groupData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${groupId}`, groupData);
  }

  // Delete a group by ID
  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${groupId}`);
  }
}
