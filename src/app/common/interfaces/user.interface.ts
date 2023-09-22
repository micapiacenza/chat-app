import {Roles} from "./roles";
import {GroupInterface} from "./group.interface";
import {RoomInterface} from "./room.interface";

export interface UserInterface {
  username: string | undefined;
  pwd: string | undefined;
  email: string | undefined;
  id: string | undefined;
  role: Roles;
  groups: GroupInterface[];
  rooms: RoomInterface[];
}

