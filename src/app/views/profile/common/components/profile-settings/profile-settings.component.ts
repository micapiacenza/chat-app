import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  selectedTab: any;
  tabList = ['Groups & Rooms', 'Users'];

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Show content of selected tab
   * @param tabList
   */
  public showTabContent(tabList: any) {
    this.selectedTab = tabList;
  };

}
