import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ProfileComponent} from "./profile.component";
import { ProfileSettingsComponent } from './common/components/profile-settings/profile-settings.component';
import { UsersTabContentComponent } from './views/users-tab-content/users-tab-content.component';
import { GroupChannelTabContentComponent } from './views/group-channel-tab-content/group-channel-tab-content.component';
import { CreateGroupComponent } from './views/create-group/create-group.component';
import { CreateChannelComponent } from './views/create-channel/create-channel.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
     ProfileSettingsComponent,
     UsersTabContentComponent,
     GroupChannelTabContentComponent,
     CreateGroupComponent,
     CreateChannelComponent
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
