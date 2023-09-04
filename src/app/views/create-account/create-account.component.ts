import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedRole: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registrationForm.invalid) {
      // Form is not valid, do not submit
      return;
    }

    const userCredentials = this.registrationForm.value;

    this.authService.registerUser(userCredentials).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
        // Redirect the user or show a success message
      },
      (error: any) => {
        console.error('Error registering user', error);
        this.errorMessage = 'Registration failed. Please try again.';
        // Handle errors and show an error message to the user
      }
    );
  }
}
