import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../common/services/auth/auth.service";

@Component({
  selector: 'app-expandable-group-card',
  templateUrl: './expandable-group-card.component.html',
  styleUrls: ['./expandable-group-card.component.css']
})
export class ExpandableGroupCardComponent implements OnInit {
  public groupList = [
    'Group 1',
    'Group 2',
    'Group 3',
    'Group 4',
    'Group 5',
  ];
  public roomList = [
    'Room 1',
    'Room 2',
    'Room 3',
  ];
  public indexExpanded: number= -1;
  public isExpand: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Get current user from AuthService
   */
  public currentUser() {
    return this.auth.getCurrentUser();
  }

  public expandCard() {
    this.isExpand = ! this.isExpand;
  }
}
