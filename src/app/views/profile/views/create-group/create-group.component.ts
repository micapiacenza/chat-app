import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../common/services/busines-logic/group.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../common/services/busines-logic/user.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  newGroupName: string = '';
  userList: any [] = [];
  errorMessage: string | undefined;

  constructor(private groupService: GroupService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.showUsersList()
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


  showUsersList() {
    this.userService.getAllUsers().subscribe((res)=>{
      console.log('List of users:', res);
      this.userList = res;
    })
  }

  cancel(){
    this.router.navigate(['/profile']);
  }

}
