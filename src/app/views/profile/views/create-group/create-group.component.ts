import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../common/services/group/group.service";
import {Observable} from "rxjs";

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
  ];
  public groups: Observable<any> | undefined;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }

  /**
   * Create Group
   */
  public createGroup(body: any): Observable<any> {
    return this.groupService.createGroup(body);
  }

}
