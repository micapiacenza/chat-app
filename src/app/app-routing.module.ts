import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {LoginComponent} from "./views/login/login.component";
import {CreateAccountComponent} from "./views/create-account/create-account.component";
import {ProfileComponent} from "./views/profile/profile.component";
import {MainChatComponent} from "./views/main-chat/main-chat.component";
import {CreateChannelComponent} from "./views/profile/views/create-channel/create-channel.component";
import {CreateGroupComponent} from "./views/profile/views/create-group/create-group.component";
import {CreateUserComponent} from "./views/profile/views/create-user/create-user/create-user.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'main-chat', component: MainChatComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: 'create-channel', component: CreateChannelComponent},
  {path: 'create-user', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
