import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AppBarModule} from "./common/components/app-bar/app-bar.module";
import { LoginComponent } from './views/login/login.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { MainChatComponent } from './views/main-chat/main-chat.component';
import { ProfileComponent } from './views/profile/profile.component';
import { HomeComponent } from './views/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainChatModule} from "./views/main-chat/main-chat.module";
import {ProfileModule} from "./views/profile/profile.module";
import {HttpClientModule} from "@angular/common/http";
import { DocumentationComponent } from './views/documentation/documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    MainChatComponent,
    ProfileComponent,
    HomeComponent,
    DocumentationComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        AppBarModule,
        FormsModule,
        MainChatModule,
        ProfileModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
