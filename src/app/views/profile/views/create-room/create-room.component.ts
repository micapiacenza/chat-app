import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../../common/services/room/room.service';
import { GroupService } from '../../../../common/services/group/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  public existingGroups: any[] = [];
  public roomName: string = '';
  public selectedGroupId: string = '';
  errorMessage: string | undefined;

  constructor(
    private roomService: RoomService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExistingGroups();
  }

  private loadExistingGroups(): void {
    this.groupService.listGroup().subscribe(
      (groups) => {
        this.existingGroups = groups;
      },
      (error) => {
        console.error('Error loading groups', error);
      }
    );
  }

  onGroupSelected(groupId: string): void {
    this.selectedGroupId = groupId;
  }

  /**
   * Create Room
   */
  public createRoom(): void {
    if (this.roomName.trim() === '') {
      alert('Room Name cannot be empty');
      return;
    }

    if (!this.selectedGroupId) {
      alert('Please select a group');
      return;
    }

    const roomData = {
      name: this.roomName,
      groupId: this.selectedGroupId,
    };

    this.roomService.createRoom(this.selectedGroupId, roomData).subscribe(
      (response) => {
        console.log('Room created successfully', response);
        this.roomName = '';
        this.selectedGroupId = '';
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error creating room', error);
        this.errorMessage = 'Room creation failed. Please try again.';
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/profile']);
  }
}
