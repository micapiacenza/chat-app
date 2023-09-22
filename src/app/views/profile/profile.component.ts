import {Component, OnInit} from '@angular/core';
import {Roles} from "../../common/interfaces/roles";
import {AuthService} from "../../common/services/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  public currentUser() {
    return this.auth.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
