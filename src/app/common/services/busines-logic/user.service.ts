import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // Create a new user
  createUser(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-user`, newUser).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error && error.error.message) {
          // Handle username error
          return throwError(error.error.message);
        } else {
          // Handle other errors
          return throwError('Error creating user. Please try again.');
        }
      })
    );
  }
}
