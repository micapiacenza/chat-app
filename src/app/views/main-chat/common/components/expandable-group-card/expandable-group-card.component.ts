import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../common/services/auth/auth.service';
import {GroupService} from '../../../../../common/services/group/group.service';
import {RoomService} from '../../../../../common/services/room/room.service';
import {Observable} from "rxjs";
import {SocketioService} from "../../../../../common/services/socket/socketio.service";

@Component({
  selector: 'app-expandable-group-card',
  templateUrl: './expandable-group-card.component.html',
  styleUrls: ['./expandable-group-card.component.css']
})
export class ExpandableGroupCardComponent implements OnInit {
  @Output() groupSelected = new EventEmitter<string>();
  @Output() roomSelected = new EventEmitter<string>();


  public indexExpanded: number = -1;
  public isExpand: boolean[] = [];
  public groupMembership: Record<string, boolean> = {};
  public groups: Observable<any> | undefined;
  public rooms: Observable<any> | undefined;
  public groupedRooms: Record<string, any[]> = {};


  constructor(
    private auth: AuthService,
    private groupService: GroupService,
    private roomService: RoomService,
    private socketioService: SocketioService,
  ) { }

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllRooms();
    this.isUserInGroup();
  }

  selectGroup(groupName: string) {
    this.groupSelected.emit(groupName);
  }

  selectRoom(roomName: string) {
    this.roomSelected.emit(roomName);
  }

  async isUserInGroup() {
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.groupService.listGroup().subscribe((groups) => {
          groups.forEach((group: any) => {
            this.groupMembership[group._id] = group.members.includes(user.id);
          });
        });
      }
    });
  }

  async joinGroup(groupId: string) {
    console.log(`Joining group: ${groupId}`);
    this.auth.getCurrentUser().subscribe((user) => {
    console.log(user);
      if (user) {
        this.groupService.joinGroup(groupId, user?.id).subscribe(
          (group: any) => {
            console.log(`Joined group: ${group.name}`);
          },
          (error) => {
            console.error('Error joining group:', error);
          }
        );
      }
    });
  }

  async leaveGroup(groupId: string) {
    console.log(`Leaving group: ${groupId}`);
    this.auth.getCurrentUser().subscribe((user) => {
      console.log(user);
      if (user) {
        this.groupService.leaveGroup(groupId, user?.id).subscribe(
          (group: any) => {
            console.log(`Left group: ${group.name}`);
            this.socketioService.leaveRoom(group.name); // TODO: Adjust to leave all rooms within group
          },
          (error) => {
            console.error('Error leaving group:', error);
          }
        );
      }
    });
  }

  joinRoom(roomId: string) {
    this.socketioService.joinRoom(roomId);
    console.log(`Joining room: ${roomId}`);
  }

  /**
   * Get all Group
   */
  public getAllGroups() {
    this.groups = this.groupService.listGroup();
  }

  /**
   * Load the list of rooms for a group
   */
  public getAllRooms() {
    this.roomService.listRooms().subscribe((rooms) => {
      // Organize rooms by group ID
      rooms.forEach((room: any) => {
        if (!this.groupedRooms[room.groupId]) {
          this.groupedRooms[room.groupId] = [];
        }
        this.groupedRooms[room.groupId].push(room);
      });
    });
  }

  /**
   * Get current user from AuthService
   */
  public currentUser() {
    return this.auth.getCurrentUser();
  }

  public expandCard(index: number) {
    this.isExpand[index] = !this.isExpand[index];
  }
}
