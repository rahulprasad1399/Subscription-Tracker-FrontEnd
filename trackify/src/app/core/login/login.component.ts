import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isActive = false;
  showRegister() {
    this.isActive = true;
  }
  showLogin() {
    this.isActive = false;
  }
}
