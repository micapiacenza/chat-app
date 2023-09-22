import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ProfileComponent} from "./profile.component";
import { ProfileSettingsComponent } from './common/components/profile-settings/profile-settings.component';
import { UsersTabContentComponent } from './views/users-tab-content/users-tab-content.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { GroupRoomTabContentComponent } from './views/group-room-tab-content/group-room-tab-content.component';
import { CreateGroupComponent } from './views/create-group/create-group.component';
import { CreateRoomComponent } from './views/create-room/create-room.component';
import {RouterModule} from "@angular/router";
import { CreateUserComponent } from './views/create-user/create-user.component';

@NgModule({
  declarations: [
     ProfileSettingsComponent,
     UsersTabContentComponent,
     GroupRoomTabContentComponent,
     CreateGroupComponent,
     CreateRoomComponent,
     CreateUserComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [],
    exports: [
        ProfileSettingsComponent
    ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
