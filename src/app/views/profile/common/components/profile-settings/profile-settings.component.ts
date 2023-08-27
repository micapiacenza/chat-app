import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  selectedTab: any;
  tabList = ['Groups & Channels', 'Users'];

  constructor() { }

  ngOnInit(): void {
  }

  // Show content of selected tab
  public showTabContent(tabList: any) {
    this.selectedTab = tabList;
  };

}
