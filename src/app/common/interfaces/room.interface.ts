import {UserInterface} from "./user.interface";

export interface RoomInterface {
  roomName?: string | undefined;
  usersIds: Array<string>;
}
