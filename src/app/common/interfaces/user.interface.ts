import {UserRole} from "../enums/user-role.enum";
import {GroupInterface} from "./group.interface";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  pwd: string;
  roles: UserRole[];
  groups: GroupInterface[];
}

