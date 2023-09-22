import { Component, OnInit } from '@angular/core';
import {Roles} from "../../../../common/interfaces/roles";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public userRoles = [
    'Super Admin',
    'Group Admin',
    'Group Assistant'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
