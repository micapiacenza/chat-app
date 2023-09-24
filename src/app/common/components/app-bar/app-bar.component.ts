import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInterface } from '../../interfaces/user.interface';
import { Roles } from '../../interfaces/roles';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  public isLogged(): boolean {
    let isLoggedIn = false;
    this.auth.isLoggedIn$.subscribe((loggedIn) => {
      isLoggedIn = loggedIn;
    });
    return isLoggedIn;
  }

  public logOut() {
    this.auth.logout();
  }
}
