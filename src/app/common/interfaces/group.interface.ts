import {ChannelInterface} from "./channel.interface";
import {UserInterface} from "./user.interface";

export interface GroupInterface {
  id: number;
  name: string;
  admins: UserInterface[];
  channels: ChannelInterface[];
  members: UserInterface[];
}

