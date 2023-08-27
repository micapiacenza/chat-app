import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public login: boolean = true;
  public signup: boolean = false;
  public activeButton: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public showLoginForm(): void {
    this.activeButton = true;
    this.login = true;
    this.signup = false;
  }

  public showCreateAccountForm(): void {
    this.activeButton = true;
    this.signup = true;
    this.login = false;
  }

}
