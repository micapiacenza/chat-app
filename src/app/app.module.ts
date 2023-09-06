import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './views/login/login.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';
import { ProfileComponent } from './views/profile/profile.component';
import { HomeComponent } from './views/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CreateUserComponent} from "./views/profile/views/create-user/create-user/create-user.component";
import {ProfileSettingsComponent} from "./views/profile/common/components/profile-settings/profile-settings.component";
import {
  GroupChannelTabContentComponent
} from "./views/profile/views/group-channel-tab-content/group-channel-tab-content.component";
import {UsersTabContentComponent} from "./views/profile/views/users-tab-content/users-tab-content.component";
import {
  ExpandableGroupCardComponent
} from "./views/main-chat/common/components/expandable-group-card/expandable-group-card.component";
import {AppBarComponent} from "./common/components/app-bar/app-bar.component";
import {CreateChannelComponent} from "./views/profile/views/create-channel/create-channel.component";
import {CreateGroupComponent} from "./views/profile/views/create-group/create-group.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    MainChatComponent,
    ProfileComponent,
    HomeComponent,
    CreateUserComponent,
    MainChatComponent,
    ProfileSettingsComponent,
    GroupChannelTabContentComponent,
    UsersTabContentComponent,
    ExpandableGroupCardComponent,
    AppBarComponent,
    CreateChannelComponent,
    CreateGroupComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
