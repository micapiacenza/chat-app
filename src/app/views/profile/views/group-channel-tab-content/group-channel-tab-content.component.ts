import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {MockData} from "../../../../common/seeder/mock-data";
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";

@Component({
  selector: 'app-group-channel-tab-content',
  templateUrl: './group-channel-tab-content.component.html',
  styleUrls: ['./group-channel-tab-content.component.css']
})
export class GroupChannelTabContentComponent implements OnInit {
  public groupList = MockData.groups;
  public channelList = MockData.channels;
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined;
  public roles = UserRole;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  public expandCard(index: number) {
    if (this.indexExpanded === index) {
      this.indexExpanded = -1;
    } else {
      this.indexExpanded = index;
    }
  }
}
