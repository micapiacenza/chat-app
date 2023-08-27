import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  public userList = [
    'user 1',
    'user 2',
    'user 3',
    'user 4',
  ];
  public existingGroupList = [
    'group 1',
    'group 2',
    'group 3',
    'group 4',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
