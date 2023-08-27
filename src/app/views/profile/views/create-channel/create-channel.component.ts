import { Component, OnInit } from '@angular/core';
import {MockData} from "../../../../common/seeder/mock-data";

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  public userList = MockData.users;
  public existingGroupList = MockData.groups;

  constructor() { }

  ngOnInit(): void {
  }
}
