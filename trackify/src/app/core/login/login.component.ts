import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm, RegisterForm } from '../../shared/models/service.model';
import { UsersignupService } from '../../shared/services/userAuth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isActive = signal(false);
  userSignup = inject(UsersignupService);
  snack = inject(MatSnackBar);
  router = inject(Router);

  registerForm = new FormGroup<RegisterForm>({
    fullName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.userSignup.registerUser(this.registerForm.getRawValue()).subscribe({
        next: (res) =>
          this.snack.open('Registration successful!', 'Ok', {
            duration: 3000,
          }),
        error: (err) =>
          this.snack.open('Something went wrong!', 'Close', {
            duration: 3000,
          }),
      });
    }
  }

  onLogIn() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.userSignup.loginUser(this.loginForm.getRawValue()).subscribe({
        next: (res) => {
          this.snack.open('Login successful!', 'Ok', {
            duration: 3000,
          });
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.snack.open('Something went wrong!', 'Close', {
            duration: 3000,
          });
          console.log(err);
        },
      });
    }
  }

  showRegister() {
    this.isActive.set(true);
  }
  showLogin() {
    this.isActive.set(false);
  }

  toggleActive() {
    this.isActive.update((prev) => !prev);
  }
}
