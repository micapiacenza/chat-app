import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {GroupService} from "../../../../common/services/busines-logic/group.service";
import {ChannelService} from "../../../../common/services/busines-logic/channels.service";

@Component({
  selector: 'app-group-channel-tab-content',
  templateUrl: './group-channel-tab-content.component.html',
  styleUrls: ['./group-channel-tab-content.component.css']
})
export class GroupChannelTabContentComponent implements OnInit {
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined;
  public roles = UserRole;
  public groupData: { group: any, channels: any[] }[] = [];


  constructor(private authService: AuthService, private groupService: GroupService, private channelService: ChannelService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadGroups();
    this.loadChannels();
  }

  loadGroups() {
    let groupList: any[] = [];
      this.groupService.getAllGroups().subscribe(
        (res) => {
          groupList = res;
          this.groupData = groupList.map((group: any) => ({
            group,
            channels: [],
          }));
          console.log('Group Data:', this.groupData)
          console.log('Groups:', groupList);
        },
        (error) => {
          console.error('Error loading groups', error);
        }
      );
  }

  loadChannels() {
    this.channelService.getAllChannels().subscribe(
      (res) => {
        const channelList = res;

        this.groupData.forEach((groupDataItem) => {
          groupDataItem.channels = channelList.filter((channel) => {
            const matched = channel.groupId.includes(groupDataItem.group.id);
            return matched;
          });
        });
      },
      (error) => {
        console.error('Error loading channels', error);
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
