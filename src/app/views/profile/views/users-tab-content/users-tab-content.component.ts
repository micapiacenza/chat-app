import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {Roles} from "../../../../common/interfaces/roles";

@Component({
  selector: 'app-users-tab-content',
  templateUrl: './users-tab-content.component.html',
  styleUrls: ['./users-tab-content.component.css']
})
export class UsersTabContentComponent implements OnInit {
  public userList = [
    'user 1',
    'user 1',
    'user 1',
    'user 1',
    'user 1',
    'user 1',
    'user 1',
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
  public roles = Roles;

  constructor() { }

  ngOnInit(): void {
  }

}
