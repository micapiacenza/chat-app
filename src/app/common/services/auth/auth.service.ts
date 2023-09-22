import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/user.interface";
import {Roles} from "../../interfaces/roles";
import {STORAGE_KEYS, StorageService} from "../storage/storage.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Users mock data
  public users: Array<UserInterface> = [
    // User 1
    {email: 'joe@email.com', pwd: 'qwerty', username: 'Joe', groups: [
      {groupName: 'Group A', rooms: [{usersIds: ['1', '2', '3']}]},
      {groupName: 'Group B', rooms: [{usersIds: ['1', '2', '3']}]},
      ], id: '1', role: Roles.superAdmin, rooms: []},
    // User 2
    {email: 'mica@email.com', pwd: 'qwerty', username: 'Mica', groups: [
      {groupName: 'Group C', rooms: [{usersIds: ['4', '5', '6']}]},
      {groupName: 'Group D', rooms: [{usersIds: ['4', '5', '6']}]},
      {groupName: 'Group E', rooms: [{usersIds: ['4', '5', '6']}]},
      ], id: '2', role: Roles.groupAdmin, rooms: []},
    // User 3
    {email: 'tom@email.com', pwd: 'qwerty', username: 'Tom', groups: [
      {groupName: 'Group F', rooms: [{usersIds: ['7', '8', '1']}]},
      {groupName: 'Group G', rooms: [{usersIds: ['7', '8', '1']}]},
      ], id: '3', role: Roles.groupAssis, rooms: []},
    // User 4
    {email: 'sara@email.com', pwd: 'qwerty', username: 'Sara', groups: [
      {groupName: 'Group H', rooms: [{usersIds: ['2', '3']}]},
      ], id: '4', role: Roles.regularUser, rooms: []},
    // User 5
    {email: 'dave@email.com', pwd: 'qwerty', username: 'Dave', groups: [
      {groupName: 'Group I', rooms: [{usersIds: ['1', '2', '3', '7']}]},
      {groupName: 'Group J', rooms: [{usersIds: ['1', '2', '3', '7']}]},
      ], id: '5', role: Roles.regularUser, rooms: []},
    // User 6
    {email: 'peter@email.com', pwd: 'qwerty', username: 'Peter', groups: [
      {groupName: 'Group K', rooms: [{usersIds: ['5', '3', '8', '6']}]}
      ], id: '6', role: Roles.regularUser, rooms: []},
    // User 7
    {email: 'nicky@email.com', pwd: 'qwerty', username: 'Nicky', groups: [
      {groupName: 'Group L', rooms: [{usersIds: ['1', '2', '8']}]}
      ], id: '7', role: Roles.regularUser, rooms: []},
    // User 8
    {email: 'jess@email.com', pwd: 'qwerty', username: 'Jess', groups: [
      {groupName: 'Group M', rooms: [{usersIds: ['8', '7', '3']}]},
      ], id: '8', role: Roles.regularUser, rooms: []},
  ];

  public inputEmail: string = '';
  public isUserLoggedIn: boolean = false;
  // Subject that emits the last value emitted by the source Observable
  public currentUser: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(private router: Router, private storageService: StorageService) {
    // If there is no data, it will generate mock data
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
   * Validates user session
   */
  public validateToken() {
    if (this.storageService.getItem(STORAGE_KEYS.currentUser)){
      this.userAuth();
    }
  }

  /**
   * Sets logged in user as current user
   * @param val
   */
  public setCurrentUser(val: UserInterface): void {
    this.currentUser.next(val)
  }

  /**
   * User authentication
   */
  public userAuth(): void {
    let valid = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === this.inputEmail) {
        valid = true;
        this.isUserLoggedIn = true;
        this.setCurrentUser(this.users[i]);
        this.router.navigate(['/main-chat']);
        break;
      }
    }
    if (!valid) {
      this.isUserLoggedIn = false;
      alert('Error: The user entered does not match any existing user');
    }
  }

  /**
   * User log out
   */
  public logOut(): void {
    this.storageService.setItem(STORAGE_KEYS.currentUser, undefined);
    void this.router.navigate(['/']);
    this.currentUser.next(null);
  }

}
