import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  public userList: any [] = [];
  public existingGroupList: any [] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
