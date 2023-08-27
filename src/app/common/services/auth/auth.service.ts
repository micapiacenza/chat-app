import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/user.interface";
import {Roles} from "../../interfaces/roles";
import {STORAGE_KEYS, StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: UserInterface | undefined;
  // Array fo dummy data
  public users: Array<UserInterface> = [
    {email: 'joe@email.com', pwd: 'qwerty', username: 'joe', groups: [], id: '1', role: Roles.superAdmin, rooms: []},
    {email: 'mica@email.com', pwd: 'qwerty', username: 'mica', groups: [], id: '2', role: Roles.groupAdmin, rooms: []},
    {email: 'tom@email.com', pwd: 'qwerty', username: 'tom', groups: [], id: '3', role: Roles.groupAssis, rooms: []},
  ];
  public currentUser: UserInterface = {
    email: undefined,
    groups: [],
    id: undefined,
    pwd: undefined,
    role: Roles.groupAssis,
    rooms: [],
    username: undefined
  }
  public inputEmail: string = '';
  public isUserLoggedIn: boolean = false;

  constructor(private router: Router, private storageService: StorageService) {
    // If there is no data, it will generate dummy data
    if (!this.storageService.getItem(STORAGE_KEYS.users)) {
      this.storageService.setItem(STORAGE_KEYS.users, this.users);
    }
  }

  public userAuth() {
    let valid = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.inputEmail) {
        valid = true;
        this.isUserLoggedIn = true;
        this.router.navigate(['/main-chat']);
        break;
      }
    }
    if (!valid) {
      this.isUserLoggedIn = false;
      alert('Error: The user entered does not match any existing user');
    }
  }

  public logOut() {
    this.storageService.setItem(STORAGE_KEYS.currentUser, undefined);
    this.router.navigate(['/']);
  }

}
