import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../common/services/auth/auth.service";
import {UserRole} from "../../../../../common/enums/user-role.enum";
import {UserInterface} from "../../../../../common/interfaces/user.interface";
import {GroupService} from "../../../../../common/services/busines-logic/group.service";

@Component({
  selector: 'app-expandable-group-card',
  templateUrl: './expandable-group-card.component.html',
  styleUrls: ['./expandable-group-card.component.css']
})
export class ExpandableGroupCardComponent implements OnInit {
  public groupList: any[] = [];
  public channelList: any[] = [];
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined | null;

  constructor(private auth: AuthService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.loadGroups();
  }

  public expandCard(index: number) {
    this.indexExpanded = (this.indexExpanded === index) ? -1 : index;
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (data) => {
        this.groupList = data;
      },
      (error) => {
        console.error('Error loading groups', error);
      }
    );
  }
}
