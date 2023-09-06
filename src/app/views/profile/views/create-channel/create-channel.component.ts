import { Component, OnInit } from '@angular/core';
import { ChannelService } from "../../../../common/services/busines-logic/channels.service";
import { GroupService } from "../../../../common/services/busines-logic/group.service";
import { UserService } from "../../../../common/services/busines-logic/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {
  public groupList: any[] = [];
  public channelName: string = '';
  errorMessage: string | undefined;

  constructor(private channelService: ChannelService, private groupService: GroupService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGroups();
  }


  createChannel() {
    const selectedGroups = this.groupList.filter(group => group.selected);

    const channelData = {
      name: this.channelName,
      groups: selectedGroups,
    };

    this.channelService.createChannel(channelData).subscribe(
      (response) => {
        this.channelName = '';
        this.router.navigate(['/profile']);
      },
        (error) => {
          console.error('Error creating channel', error);
          this.errorMessage = 'Channel creation failed. Please try again.';
        });
  }

  cancel(){
    this.router.navigate(['/profile']);
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe((groups: any[]) => {
      this.groupList = groups;
    });
  }
}
