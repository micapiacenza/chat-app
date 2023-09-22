import {Component, OnInit} from '@angular/core';
import {Roles} from "../../../../common/interfaces/roles";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {STORAGE_KEYS, StorageService} from "../../../../common/services/storage/storage.service";
import {UserService} from "../../../../common/services/user/user.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-users-tab-content',
  templateUrl: './users-tab-content.component.html',
  styleUrls: ['./users-tab-content.component.css']
})
export class UsersTabContentComponent implements OnInit {
  public roles = Roles;
  public assignRoleObservable: Observable<any> | undefined;
  public users: Observable<any> | undefined;

  constructor(private auth: AuthService, private storageService: StorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.getAllUsers();
  }

  /**
   * Get all users
   */
  public getAllUsers(): Observable<any> {
    return this.userService.listUsers();
  }

  /**
   * Create User
   */
  public createUser(body: any): Observable<any> {
    return this.userService.createUser(body);
  }

  /**
   * Get User
   */
  public getUser(id: string): Observable<any>  {
    return this.userService.getUserById(id);
  }

  /**
   * Assign user to a role
   */
  public assignRoleToUser(id: string, role: string): void {
    this.assignRoleObservable = this.userService.assignRole(id, role);
  }

  /**
   * Delete User
   */
  public deleteUser(id: string): Observable<any>  {
    return this.userService.deleteUser(id);
  }

  /**
   * Get current user from AuthService
   */
  public currentUser() {
    return this.auth.getCurrentUser();
  }

}
