import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/user.interface";
import {STORAGE_KEYS, StorageService} from "../storage/storage.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: UserInterface | undefined;
  public users: UserInterface[] | undefined;
  public currentUser: UserInterface | undefined;
  public inputEmail: string = '';
  public isUserLoggedIn: boolean = false;
  private baseUrl = 'http://localhost:3001';

  constructor(private router: Router, private storageService: StorageService, private http: HttpClient) {
    // If there is no data, it will generate dummy data
    if (!this.storageService.getItem(STORAGE_KEYS.users)) {
      this.storageService.setItem(STORAGE_KEYS.users, this.users);
    }
  }

  public registerHttpRequest(userCredentials: {}) {
    return this.http.post(`${this.baseUrl}/api/register`, userCredentials);
  }

  public registerUser(userCredentials: {}) {
    this.registerHttpRequest(userCredentials).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/main-chat']);
      },
      (error) => {
        console.error('Error registering user', error);
        // Handle errors and show error messages
      }
    );
    return this.registerHttpRequest(userCredentials);
  }

  public loginHttpRequest(credentials: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, credentials);
  }

  public loginUser(userCredentials: {}) {
    this.loginHttpRequest(userCredentials).subscribe(
      (response) => {
        console.log('User login successfully', response);
        this.router.navigate(['/main-chat']);
      },
      (error) => {
        console.error('Error login user', error);
      }
    );
    return this.loginHttpRequest(userCredentials);
  }

  public logOut() {
    this.storageService.setItem(STORAGE_KEYS.currentUser, undefined);
    this.router.navigate(['/']);
  }

}
