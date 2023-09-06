import { Component } from '@angular/core';
import {UserService} from "../../../../../common/services/busines-logic/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  username: string = '';
  email: string = '';
  pwd: string = '';
  selectedRole: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router,) {}

  createUser() {
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.pwd,
      roles: [this.selectedRole]
    };

    this.userService.createUser(newUser).subscribe(
      (response: any) => {
        console.log('User created successfully', response);
        this.username = '';
        this.email = '';
        this.pwd = '';
        this.selectedRole = '';
        this.errorMessage = '';

        // Redirect when the user is successfully created
        const shouldRedirect = true;

        if (shouldRedirect) {
          this.router.navigate(['/profile']);
        }
      },
      (error: any) => {
        console.error('Error creating user', error);
        if (error.toLowerCase().includes('username is already taken')) {
          this.errorMessage = 'Username is already taken. Please choose another username.';
        } else {
          this.errorMessage = 'Error creating user. Please try again.';
        }
      }
    );
  }


}
