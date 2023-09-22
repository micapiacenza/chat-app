import {RoomInterface} from "./room.interface";

export interface GroupInterface {
  groupName: string | undefined;
  rooms: RoomInterface[];
}
