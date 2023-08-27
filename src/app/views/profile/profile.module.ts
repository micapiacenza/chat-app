import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ProfileComponent} from "./profile.component";
import { ProfileSettingsComponent } from './common/components/profile-settings/profile-settings.component';
import { UsersTabContentComponent } from './views/users-tab-content/users-tab-content.component';
import { GroupRoomTabContentComponent } from './views/group-room-tab-content/group-room-tab-content.component';
import { CreateGroupComponent } from './views/create-group/create-group.component';
import { CreateRoomComponent } from './views/create-room/create-room.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
     ProfileSettingsComponent,
     UsersTabContentComponent,
     GroupRoomTabContentComponent,
     CreateGroupComponent,
     CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
  ],
  providers: [],
    exports: [
        ProfileSettingsComponent
    ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
