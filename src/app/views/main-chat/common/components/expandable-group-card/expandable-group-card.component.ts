import { Component, OnInit } from '@angular/core';
import {MockData} from "../../../../../common/seeder/mock-data";

@Component({
  selector: 'app-expandable-group-card',
  templateUrl: './expandable-group-card.component.html',
  styleUrls: ['./expandable-group-card.component.css']
})
export class ExpandableGroupCardComponent implements OnInit {
  public groupList = MockData.groups;
  public channelList = MockData.channels;
  public indexExpanded: number = -1;
  public isExpand: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public expandCard(index: number) {
    this.indexExpanded = (this.indexExpanded === index) ? -1 : index;
  }
}
