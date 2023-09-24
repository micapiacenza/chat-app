import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './views/login/login.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';
import { ProfileComponent } from './views/profile/profile.component';
import { HomeComponent } from './views/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppBarComponent} from "./common/components/app-bar/app-bar.component";
import {
  ExpandableGroupCardComponent
} from "./views/main-chat/common/components/expandable-group-card/expandable-group-card.component";
import {ProfileSettingsComponent} from "./views/profile/common/components/profile-settings/profile-settings.component";
import {
  GroupRoomTabContentComponent
} from "./views/profile/views/group-room-tab-content/group-room-tab-content.component";
import {UsersTabContentComponent} from "./views/profile/views/users-tab-content/users-tab-content.component";
import {CreateGroupComponent} from "./views/profile/views/create-group/create-group.component";
import {CreateRoomComponent} from "./views/profile/views/create-room/create-room.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    MainChatComponent,
    ProfileComponent,
    HomeComponent,
    AppBarComponent,
    ExpandableGroupCardComponent,
    GroupRoomTabContentComponent,
    UsersTabContentComponent,
    ProfileSettingsComponent,
    CreateGroupComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
