import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {Roles} from "../../../../common/interfaces/roles";

@Component({
  selector: 'app-group-room-tab-content',
  templateUrl: './group-room-tab-content.component.html',
  styleUrls: ['./group-room-tab-content.component.css']
})
export class GroupRoomTabContentComponent implements OnInit {
  public groupList = [
    'Group 1',
    'Group 2',
    'Group 3',
    'Group 4',
    'Group 5',
  ];
  public roomList = [
    'Room 1',
    'Room 2',
    'Room 3',
  ];
  public indexExpanded: number= -1;
  public isExpand: boolean = false;
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

  public expandCard() {
    this.isExpand = ! this.isExpand;
  }
}
