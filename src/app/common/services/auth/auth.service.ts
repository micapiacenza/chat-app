import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/user.interface";
import {STORAGE_KEYS, StorageService} from "../storage/storage.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, tap} from "rxjs";
import {UserService} from "../busines-logic/user.service";
import {GroupService} from "../busines-logic/group.service";
import {ChannelService} from "../busines-logic/channels.service";
import {GroupInterface} from "../../interfaces/group.interface";
import {ChannelInterface} from "../../interfaces/channel.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: UserInterface | undefined;
  public users: UserInterface[] | undefined;
  public currentUser: UserInterface | undefined;
  public inputEmail: string = '';
  private baseUrl = 'http://localhost:3001';

  constructor(private router: Router,
              private storageService: StorageService,
              private http: HttpClient,
              private userService: UserService,
              private groupService: GroupService,
              private channelService: ChannelService,
  ) {
    // If there is no data, it will generate dummy data
    this.users = this.storageService.getItem<UserInterface[]>(STORAGE_KEYS.users) || [];
  }

  public registerHttpRequest(userCredentials: {}) {
    return this.http.post(`${this.baseUrl}/api/register`, userCredentials);
  }

  public registerUser(userCredentials: {}) {
    this.registerHttpRequest(userCredentials).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/main-chat']);
        this.storageService.setItem(STORAGE_KEYS.currentUser, response);
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
        this.router.navigate(['/main-chat']);
        this.storageService.setItem(STORAGE_KEYS.currentUser, response);
      },
      (error) => {
        console.error('Error login user', error);
      }
    );
    return this.loginHttpRequest(userCredentials);
  }

  isUserLoggedIn(): boolean {
    const currentUser = this.storageService.getItem<UserInterface>(STORAGE_KEYS.currentUser);
    return !!currentUser;
  }

  // Get the user from local storage
  getCurrentUser(): UserInterface | undefined {
    const storedUser = this.storageService.getItem<UserInterface>(STORAGE_KEYS.currentUser);
    if (storedUser) {
      return storedUser;
    }
    return undefined;
  }

  getRole(): string | undefined {
    const currentUser = this.getCurrentUser();

    if (currentUser) {
      return currentUser.roles[0];
    }

    return undefined;
  }

  // Fetch and store user's groups and channels
  fetchAndStoreGroupsAndChannels(): Observable<[GroupInterface[], ChannelInterface[]]> {
    const groups$ = this.groupService.getAllGroups();
    const channels$ = this.channelService.getAllChannels();

    return forkJoin([groups$, channels$]).pipe(
      tap(([groups, channels]) => {
        // Store groups and channels in local storage
        this.storageService.setItem(STORAGE_KEYS.groups, groups);
        this.storageService.setItem(STORAGE_KEYS.channels, channels);
      })
    );
  }

  public logOut() {
    this.storageService.setItem(STORAGE_KEYS.currentUser, undefined);
    this.router.navigate(['/']);
  }

}
