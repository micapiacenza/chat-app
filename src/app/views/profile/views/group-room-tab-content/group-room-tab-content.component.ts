import { Component, OnInit } from '@angular/core';
import {Roles} from "../../../../common/interfaces/roles";
import {AuthService} from "../../../../common/services/auth/auth.service";
import {GroupService} from "../../../../common/services/group/group.service";
import {Observable} from "rxjs";
import {RoomService} from "../../../../common/services/room/room.service";

@Component({
  selector: 'app-group-room-tab-content',
  templateUrl: './group-room-tab-content.component.html',
  styleUrls: ['./group-room-tab-content.component.css']
})
export class GroupRoomTabContentComponent implements OnInit {
  public indexExpanded: number = -1;
  public isExpand: boolean = false;
  public roles = Roles;
  public groups: Observable<any> | undefined;
  public rooms: Observable<any> | undefined;

  constructor(private auth: AuthService, private groupService: GroupService, private roomService: RoomService) {}

  ngOnInit(): void {
  }

  // GROUPS
  /**
   * Get all Group
   */
  public getAllGroups(): Observable<any> {
    return this.groupService.listGroup();
  }

  /**
   * Get Group
   */
  public getGroup(id: string): Observable<any>  {
    return this.groupService.getGroupById(id);
  }

  /**
   * Delete Group
   */
  public deleteGroup(id: string): Observable<any>  {
    return this.groupService.deleteGroup(id);
  }

  /**
   * Get all Rooms
   */
  public getAllRooms(): Observable<any> {
    return this.roomService.listRoom();
  }

  // ROOMS
  /**
   * Get Room
   */
  public getRoom(id: string): Observable<any>  {
    return this.roomService.getRoomById(id);
  }

  /**
   * Delete Room
   */
  public deleteRoom(id: string): Observable<any>  {
    return this.roomService.deleteRoom(id);
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
  public expandCard() {
    this.isExpand = ! this.isExpand;
  }
}
