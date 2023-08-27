import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppBarComponent } from './app-bar.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    AppBarComponent
  ],
  bootstrap: [AppBarComponent]
})
export class AppBarModule { }
