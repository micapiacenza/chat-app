import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../common/interfaces/user.interface";
import {Roles} from "../../common/interfaces/roles";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
