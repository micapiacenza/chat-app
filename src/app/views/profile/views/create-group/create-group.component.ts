import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../common/services/busines-logic/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  newGroupName: string = '';
  userList: any [] = [];
  errorMessage: string | undefined;

  constructor(private groupService: GroupService, private router: Router) { }

  ngOnInit(): void {
  }

  createGroup() {
    const groupData = {
      name: this.newGroupName,
      // TODO: Add list
    };

    // Call the createGroup method in the GroupService to create the group
    this.groupService.createGroup(groupData).subscribe(
      (response) => {
        // Handle success: clear the form and update the list of groups
        this.newGroupName = '';
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error creating group', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }

}
