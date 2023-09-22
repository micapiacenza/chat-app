import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../../../common/services/room/room.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  public userList = [
    'user 1',
    'user 2',
    'user 3',
    'user 4',
  ];
  public existingGroupList = [
    'group 1',
    'group 2',
    'group 3',
    'group 4',
  ];
  public rooms: Observable<any> | undefined;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
  }

  /**
   * Create Rooms
   */
  public createRooms(body: any): Observable<any> {
    return this.roomService.createRoom(body);
  }

}
