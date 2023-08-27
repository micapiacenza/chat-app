import { Component, OnInit } from '@angular/core';
import {MockData} from "../../../../common/seeder/mock-data";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  public userList = MockData.users;
  constructor() { }

  ngOnInit(): void {
  }

}
