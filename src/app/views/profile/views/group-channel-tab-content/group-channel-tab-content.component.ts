import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {GroupService} from "../../../../common/services/busines-logic/group.service";

@Component({
  selector: 'app-group-channel-tab-content',
  templateUrl: './group-channel-tab-content.component.html',
  styleUrls: ['./group-channel-tab-content.component.css']
})
export class GroupChannelTabContentComponent implements OnInit {
  public groupList: any[] = [];
  public channelList: any[] = [];
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined;
  public roles = UserRole;

  constructor(private authService: AuthService, private groupService: GroupService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (data) => {
        this.groupList = data;
        console.log('Groups:', this.groupList);
        console.log('Groups:', this.groupList);
      },
      (error) => {
        console.error('Error loading groups', error);
      }
    );
  }

  public expandCard(index: number) {
    if (this.indexExpanded === index) {
      this.indexExpanded = -1;
    } else {
      this.indexExpanded = index;
    }
  }
}
