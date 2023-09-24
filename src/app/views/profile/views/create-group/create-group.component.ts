import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../../common/services/group/group.service';
import { UserService } from '../../../../common/services/user/user.service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  newGroupName: string = '';
  allUsers: Observable<any> | undefined;
  userList: any [] = [];
  errorMessage: string | undefined;
  private selectedUsers: string[] = [];

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllUsers()
  }

  private loadAllUsers(): void {
    this.userService.listUsers().subscribe(
      (users) => {
        // Initialize userList with users from the server
        this.userList = users.map((user: any) => ({
          ...user,
          selected: false,
        }));
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }


  createGroup() {
    // Filter the userList to get only selected users
    const selectedUsers = this.userList.filter(user => user.selected);

    const groupData = {
      name: this.newGroupName,
      members: selectedUsers,
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
        this.errorMessage = 'Group creation failed. Please try again.';
      }
    );
  }

  /**
   * Toggle user selection
   * @param userId The ID of the user to toggle
   */
  toggleUserSelection(userId: string): void {
    const index = this.selectedUsers.indexOf(userId);

    if (index === -1) {
      // User is not selected, so add to the list
      this.selectedUsers.push(userId);
    } else {
      // User is already selected, so remove from the list
      this.selectedUsers.splice(index, 1);
    }
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }

}
