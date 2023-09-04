import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]],
    });
  }

  public login() {
    if (this.loginForm.valid) {
      const userCredentials = this.loginForm.value;
      this.auth.loginUser(userCredentials).subscribe(
        (response) => {
          console.log('User logged in successfully', response);
        },
        (error) => {
          console.error('Error logging in', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
  }
}
