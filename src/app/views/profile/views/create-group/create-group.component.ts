import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  public userList = [
    'user 1',
    'user 2',
    'user 3',
    'user 4',
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
