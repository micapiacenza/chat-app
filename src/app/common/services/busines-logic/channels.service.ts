import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // Create a new channel
  createChannel(channelData: any): Observable<any> {
    const url = `${this.baseUrl}/create-channel`;
    return this.http.post<any>(url, channelData);
  }

  // Get all channels
  getAllChannels(): Observable<any[]> {
    const url = `${this.baseUrl}/channels`;
    return this.http.get<any[]>(url);
  }

  // Update a channel by ID
  updateChannel(channelId: number, channelData: any): Observable<any> {
    const url = `${this.baseUrl}/update-channel/${channelId}`;
    return this.http.put<any>(url, channelData);
  }

  // Delete a channel by ID
  deleteChannel(channelId: number): Observable<any> {
    const url = `${this.baseUrl}/delete-channel/${channelId}`;
    return this.http.delete<any>(url);
  }
}
