import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../common/interfaces/user.interface";
import {UserRole} from "../../common/enums/user-role.enum";
import {AuthService} from "../../common/services/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public currentUser: UserInterface | undefined;
  public roles = UserRole;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
