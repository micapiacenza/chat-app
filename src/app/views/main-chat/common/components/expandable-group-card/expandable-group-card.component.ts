import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../../common/services/auth/auth.service";
import {UserRole} from "../../../../../common/enums/user-role.enum";
import {UserInterface} from "../../../../../common/interfaces/user.interface";
import {GroupService} from "../../../../../common/services/busines-logic/group.service";
import {ChannelService} from "../../../../../common/services/busines-logic/channels.service";

@Component({
  selector: 'app-expandable-group-card',
  templateUrl: './expandable-group-card.component.html',
  styleUrls: ['./expandable-group-card.component.css']
})
export class ExpandableGroupCardComponent implements OnInit {
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined | null;
  public roles = UserRole;
  public groupData: { group: any, channels: any[] }[] = [];

  constructor(private auth: AuthService, private groupService: GroupService, private channelService: ChannelService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.loadGroups();
    this.loadChannels()
  }

  public expandCard(index: number) {
    this.indexExpanded = (this.indexExpanded === index) ? -1 : index;
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
            return channel.groupId.includes(groupDataItem.group.id);
          });
        });
      },
      (error) => {
        console.error('Error loading channels', error);
      }
    );
  }
}
