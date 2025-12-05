import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  LoginForm,
  OtpData,
  RegisterForm,
  UserData,
} from '../../shared/models/service.model';
import { UsersignupService } from '../../shared/services/userAuth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isActive = signal(false);
  userSignup = inject(UsersignupService);
  snack = inject(MatSnackBar);
  router = inject(Router);
  showOtpModal = signal(false);
  otpDigits = ['', '', '', ''];

  get regControls() {
    return this.registerForm.controls;
  }

  get logControls() {
    return this.loginForm.controls;
  }

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

  sendOtp() {
    const data: UserData = {
      email: this.registerForm.value.email!,
      fullName: this.registerForm.value.fullName!,
    };

    this.userSignup.sendOtp(data).subscribe({
      next: (res) => {
        this.snack.open(
          'OTP sent successfully. Please check your email.',
          'Ok',
          {
            duration: 3000,
          }
        );
        this.showOtpModal.set(true);
      },
      error: (err) =>{

        this.snack.open(
          err?.error?.errors[0]?.message || 'Something went wrong',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        )
        
      }
    });
  }

  handleOtpInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (isNaN(Number(value)) && value !== '') {
      this.otpDigits[index] = '';
      input.value = '';
      return;
    }

    this.otpDigits[index] = value;

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  }

  handleOtpKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  }

  verifyOtp() {
    const code = this.otpDigits.join('');
    if (code.length === 4) {
      const otpData: OtpData = {
        otp: code,
        email: this.registerForm.value.email!,
      };
      this.userSignup.verify(otpData).subscribe({
        next: (res) => {
          this.snack.open('OTP verification successfull.', 'Ok', {
            duration: 3000,
          });
          this.showOtpModal.set(false);
          this.verifiedRegistartion();
        },
        error: (err) =>
          this.snack.open('Something went wrong!', 'Close', {
            duration: 3000,
          }),
      });

      this.showOtpModal.set(false);
      this.otpDigits = ['', '', '', ''];
    }
  }

  closeOtpModal() {
    this.showOtpModal.set(false);
    this.otpDigits = ['', '', '', ''];
  }
  onRegister() {
    if (this.registerForm.valid) {
      this.sendOtp();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  verifiedRegistartion() {
    this.userSignup.registerUser(this.registerForm.getRawValue()).subscribe({
      next: (res) => {
        this.snack.open('Registration successful!', 'Ok', {
          duration: 3000,
        });
        this.loginForm.patchValue({
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        });
        this.onLogIn();
      },
      error: (err) => {
        this.snack.open(
          err?.error?.errors[0]?.message || 'Something went wrong',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      },
    });
  }
  onLogIn() {
    if (this.loginForm.valid) {
      this.userSignup.loginUser(this.loginForm.getRawValue()).subscribe({
        next: (res) => {
          this.userSignup.user.set(res);
          this.snack.open('Login successful!', 'Ok', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.snack.open(
            err?.error?.details || 'Something went wrong',
            'Close',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
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
