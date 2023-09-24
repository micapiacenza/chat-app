import {Roles} from "./roles";
import {GroupInterface} from "./group.interface";

export interface UserInterface {
  id: string | undefined;
  username: string | undefined;
  email: string | undefined;
  pwd: string | undefined;
  role: Roles;
  groups: GroupInterface[];
}

