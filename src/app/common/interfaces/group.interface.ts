import {RoomInterface} from "./room.interface";
import {UserInterface} from "./user.interface";

export interface GroupInterface {
  id: string | undefined;
  groupName: string | undefined;
  admins: UserInterface[];
  rooms: RoomInterface[];
  members: UserInterface[];
}
