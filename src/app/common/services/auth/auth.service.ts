import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { StorageService, STORAGE_KEYS } from '../storage/storage.service';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private httpService: HttpService,
    private storageService: StorageService
  ) {}

  /**
   * Gets logged in user as current user
   */
  public getCurrentUser(): Observable<UserInterface | null> {
    const user = this.storageService.getItem(STORAGE_KEYS.currentUser);
    return of(user);
  }

  /**
   * Sets logged in user as current user
   * @param user
   */
  private setCurrentUser(user: UserInterface | null): void {
    this.storageService.setItem(STORAGE_KEYS.currentUser, user);
  }

  /**
   * User registration (signup)
   * @param user UserInterface object with registration data
   */
  public register(user: UserInterface): Observable<any> {
    return this.httpService.post('auth/register', user).pipe(
      map((response: any) => {
        if (response && response.message === 'User registered successfully') {
          this.setLoggedIn(true);
          this.setCurrentUser(response);

          this.router.navigate(['/main-chat']);
          return response;
        } else {
          this.setLoggedIn(false);
          throw new Error('Registration failed');
        }
      }),
      catchError((error) => {
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
        if (response && response.token) {
          this.loggedIn.next(true);
          this.setCurrentUser(response);

          this.router.navigate(['/main-chat']);
          return response;
        } else {
          this.loggedIn.next(false);
          throw new Error('Authentication failed');
        }
      }),
      catchError((error) => {
        this.loggedIn.next(false);
        return throwError(error);
      })
    );
  }


  /**
   * User log out
   */
  public logout(): void {
    // Clear local storage items
    this.storageService.deleteItem(STORAGE_KEYS.currentUser);

    // Update the login status
    this.setLoggedIn(false);

    // Redirect the user to the login page
    this.router.navigate(['/']);
  }

  // Function to return the login status as an observable boolean
  public isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Function to set the logged-in status
  private setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }
}
