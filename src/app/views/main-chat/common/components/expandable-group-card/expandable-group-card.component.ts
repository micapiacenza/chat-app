import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../common/services/auth/auth.service';
import {GroupService} from '../../../../../common/services/group/group.service';
import {RoomService} from '../../../../../common/services/room/room.service';
import {Observable} from "rxjs";

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
  public groups: Observable<any> | undefined;
  public rooms: Observable<any> | undefined;
  public groupedRooms: Record<string, any[]> = {};


  constructor(
    private auth: AuthService,
    private groupService: GroupService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllRooms()
  }

  selectGroup(groupName: string) {
    this.groupSelected.emit(groupName);
  }

  selectRoom(roomName: string) {
    this.roomSelected.emit(roomName);
  }

  joinGroup(groupId: string) {
    this.auth.getCurrentUser().subscribe((user) => {
    console.log(user);

      if (user) {
        this.groupService.joinGroup(groupId, user?.id).subscribe(
          (group: any) => {
            // Handle successful group join here
            console.log(`Joined group: ${group.name}`);
            // You may want to refresh the list of rooms or perform other actions here
          },
          (error) => {
            // Handle error if joining the group fails
            console.error('Error joining group:', error);
          }
        );
      }
    });
  }

  public isMember(groupId: string): boolean {
    this.auth.getCurrentUser().subscribe((user) => {
      if (!user) {
        return false;
      }
      const group: any = this.groupService.getGroupById(groupId);
      if (group) {
        return group.members.includes(user.id);
      }
    });

    return false;
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
