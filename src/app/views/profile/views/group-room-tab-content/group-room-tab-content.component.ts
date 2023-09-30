import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../../common/interfaces/roles';
import { AuthService } from '../../../../common/services/auth/auth.service';
import { Observable } from 'rxjs';
import { GroupService } from '../../../../common/services/group/group.service';
import { RoomService } from '../../../../common/services/room/room.service';

@Component({
  selector: 'app-group-room-tab-content',
  templateUrl: './group-room-tab-content.component.html',
  styleUrls: ['./group-room-tab-content.component.css'],
})
export class GroupRoomTabContentComponent implements OnInit {
  public indexExpanded: number = -1;
  public isExpand: boolean[] = [];
  public roles = Roles;
  public groups: Observable<any> | undefined;
  public rooms: Observable<any> | undefined;
  public groupedRooms: Record<string, any[]> = {};


  constructor(
    private auth: AuthService,
    private groupService: GroupService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllRooms();
  }

  /**
   * Get all Group
   */
  public getAllGroups() {
    this.groups = this.groupService.listGroup();
  }

  /**
   * Delete Group
   */
  public deleteGroup(id: string) {
    this.groupService.deleteGroup(id).subscribe(
      () => {
        console.log('Group deleted successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting group', error);
      }
    );
  }

  /**
   * Get all Rooms
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
   * Delete Room
   */
  public deleteRoom(id: string) {
    this.roomService.deleteRoom(id).subscribe(
      () => {
        console.log('Room deleted successfully');
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting room', error);
      }
    );
  }

  /**
   * Get current user from AuthService
   */
  public currentUser() {
    return this.auth.getCurrentUser();
  }

  /**
   * Logic to expand/collapse cards
   */
  public expandCard(index: number) {
    this.isExpand[index] = !this.isExpand[index];
  }
}
