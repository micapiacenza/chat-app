import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {UserService} from "../../../../common/services/busines-logic/user.service";
import {GroupService} from "../../../../common/services/busines-logic/group.service";

@Component({
  selector: 'app-users-tab-content',
  templateUrl: './users-tab-content.component.html',
  styleUrls: ['./users-tab-content.component.css']
})
export class UsersTabContentComponent implements OnInit {
  public userList: any [] = [];
  public groupList: any[] = [];
  public currentUser: UserInterface | undefined;
  public roles = UserRole;
  public showChannelSection = false;
  public showGroupSection = false;

  constructor(private authService: AuthService, private userService: UserService, private groupService: GroupService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUsers();
    this.getAllGroups();
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

  getAllGroups() {
    this.groupService.getAllGroups().subscribe((groups: any[]) => {
      this.groupList = groups;
    });
  }

  openChannelSection() {
    this.showChannelSection = !this.showChannelSection;
  }

  openGroupSection() {
    this.showGroupSection = !this.showGroupSection;
  }
}
