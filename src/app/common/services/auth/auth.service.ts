import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/user.interface";
import {STORAGE_KEYS, StorageService} from "../storage/storage.service";
import {MockData} from "../../seeder/mock-data";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: UserInterface | undefined;
  public users: UserInterface[] = MockData.users;
  public currentUser: UserInterface | undefined;
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
        this.currentUser = this.users[i];
        this.storageService.setItem(STORAGE_KEYS.currentUser, this.currentUser);
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
