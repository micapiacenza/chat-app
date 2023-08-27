import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserInterface} from "../../interfaces/user.interface";
import {Roles} from "../../interfaces/roles";

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }

  // Check if user is logged in
  public isLogged(): boolean {
    return this.auth.isUserLoggedIn;
  }

  // Calls logout function
  public logOut() {
    this.auth.logOut();
  }

}
