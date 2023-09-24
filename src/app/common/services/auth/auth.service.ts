import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { STORAGE_KEYS, StorageService } from '../storage/storage.service';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users: Array<UserInterface> = [];
  public currentUser: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    if (!this.storageService.getItem(STORAGE_KEYS.users)) {
      this.storageService.setItem(STORAGE_KEYS.users, this.users);
    }
  }

  /**
   * Gets logged in user as current user
   */
  public getCurrentUser(): Observable<UserInterface | null> {
    return this.currentUser.asObservable();
  }

  /**
   * Sets logged in user as current user
   * @param val
   */
  public setCurrentUser(val: UserInterface): void {
    this.currentUser.next(val);
  }

  /**
   * User registration (signup)
   * @param user UserInterface object with registration data
   */
  public register(user: UserInterface): Observable<any> {
    return this.httpService.post('auth/register', user).pipe(
      map((response: any) => {
        // Log the response for debugging
        console.log('Server Response:', response);

        // Check if the response indicates successful registration
        if (response && response.message === 'User registered successfully') {
          // Update the user login status and current user
          this.setLoggedIn(true);
          this.setCurrentUser(user);

          // Navigate to the main chat or another appropriate route
          this.router.navigate(['/main-chat']);

          // Return any additional data you want to expose
          return response;
        } else {
          // If the response doesn't match the success message, handle the error
          this.setLoggedIn(false);
          throw new Error('Registration failed');
        }
      }),
      catchError((error) => {
        // Handle network errors or server errors
        this.setLoggedIn(false);
        return throwError(error);
      })
    );
  }


  /**
   * User login
   */
  public userLogin(userCredentials: { email: string, pwd: string }): Observable<any> {
    return this.httpService.post('auth/login', userCredentials).pipe(
      map((response: any) => {
        // Check if the response contains the token property
        if (response && response.token) {
          // Save the token to local storage
          localStorage.setItem('token', response.token);

          // Update user login status
          this.setLoggedIn(true);

          // Navigate to the main chat or another appropriate route
          this.router.navigate(['/main-chat']);
          return response; // Return the entire response if needed
        } else {
          this.setLoggedIn(false);
          throw new Error('Authentication failed');
        }
      }),
      catchError((error) => {
        this.setLoggedIn(false);
        return throwError(error);
      })
    );
  }


  /**
   * User log out
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.setLoggedIn(false);
    this.router.navigate(['/']);
  }

  // Function to return the login status as a boolean
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Function to set the logged-in status
  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }
}
