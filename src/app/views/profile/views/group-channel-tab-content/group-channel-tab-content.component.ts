import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../../../common/enums/user-role.enum';
import {UserInterface} from "../../../../common/interfaces/user.interface";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {GroupService} from "../../../../common/services/busines-logic/group.service";
import {ChannelService} from "../../../../common/services/busines-logic/channels.service";
import {forkJoin, map, Observable} from "rxjs";
import {GroupInterface} from "../../../../common/interfaces/group.interface";
import {ChannelInterface} from "../../../../common/interfaces/channel.interface";

@Component({
  selector: 'app-group-channel-tab-content',
  templateUrl: './group-channel-tab-content.component.html',
  styleUrls: ['./group-channel-tab-content.component.css']
})
export class GroupChannelTabContentComponent implements OnInit {
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public currentUser: UserInterface | undefined;
  public groups: GroupInterface | undefined;
  public channels: ChannelInterface | undefined;
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

  deleteGroup(id: string){
    this.groupService.deleteGroup(id).subscribe(() => {
      console.log('Group deleted successfully');
    });
  }

  deleteChannel(id: string){
    this.channelService.deleteChannel(id).subscribe(() => {
      console.log('Channel deleted successfully');
    });
  }

  mapUserRoleToEnum(userRoles: string[]): UserRole {
    if (userRoles[0] === UserRole.SuperAdmin) {
      return UserRole.SuperAdmin;
    } else if (userRoles[0] === UserRole.GroupAdmin) {
      return UserRole.GroupAdmin;
    } else {
      return UserRole.User;
    }
  }

  allowUserToJoinChat(userId: string) {
    // Step 1: Get all groups
    const groups$ = this.groupService.getAllGroups();

    // Step 2: Get all channels
    const channels$ = this.channelService.getAllChannels();

    // Step 3: Get the current user's ID (already have it or fetch it from local storage)
    const currentUser = this.authService.getCurrentUser(); // Implement this method to retrieve the current user

    // Step 4: Check the groups and channels where the user is a member
    return forkJoin([groups$, channels$]).pipe(
      map(([groups, channels]) => {
        // Filter groups where the user is a member
        const userGroups = groups.filter(group => group.members.some((member: { id: string; }) => member.id === userId));

        // Filter channels where the user is a member
        const userChannels = channels.filter(channel => channel.groupId.some((groupId: any) => userGroups.some(group => group.id === groupId)));

        return {
          groups: userGroups,
          channels: userChannels,
        };
      })
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
