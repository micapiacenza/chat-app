import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MainChatComponent} from "./main-chat.component";
import { ExpandableGroupCardComponent } from './common/components/expandable-group-card/expandable-group-card.component';

@NgModule({
  declarations: [

    ExpandableGroupCardComponent
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  exports: [
    ExpandableGroupCardComponent
  ],
  bootstrap: [MainChatComponent]
})
export class MainChatModule { }
