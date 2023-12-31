import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    console.log('navbar ngOnInit', this.isLoggedIn);
  }

  // Calls logout function
  public logOut() {
    this.auth.logOut();
    this.isLoggedIn = false;
  }

}
