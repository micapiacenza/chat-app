import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {UserService} from "../../../../common/services/busines-logic/user.service";

@Component({
  selector: 'app-users-tab-content',
  templateUrl: './users-tab-content.component.html',
  styleUrls: ['./users-tab-content.component.css']
})
export class UsersTabContentComponent implements OnInit {
  public userList: any [] = [];
  public currentUser: UserInterface | undefined;
  public roles = UserRole;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.userList = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  mapUserRoleToEnum(userRoles: string[]): UserRole {
    if (userRoles[0] === UserRole.SuperAdmin) {
      return UserRole.SuperAdmin;
    } else if (userRoles[0] === UserRole.GroupAdmin) {
      return UserRole.GroupAdmin;
    } else {
      return UserRole.User;
    }
  }
}
