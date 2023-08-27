import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {MockData} from "../../../../common/seeder/mock-data";
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";

@Component({
  selector: 'app-users-tab-content',
  templateUrl: './users-tab-content.component.html',
  styleUrls: ['./users-tab-content.component.css']
})
export class UsersTabContentComponent implements OnInit {
  public userList = MockData.users;
  public currentUser: UserInterface | undefined;
  public roles = UserRole;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
