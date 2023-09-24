import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from '../../interfaces/user.interface';
import { Roles } from '../../interfaces/roles';
import {Observable} from "rxjs";

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  
  public logOut() {
    this.auth.logout();
  }
}
