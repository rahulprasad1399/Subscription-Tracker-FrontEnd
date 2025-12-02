import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../shared/services/notification.service';
import { UsersignupService } from '../../../shared/services/userAuth.service';

@Component({
  selector: 'app-user-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  http = inject(HttpClient);
  notificationService = inject(NotificationService);
  router = inject(Router)

  authService = inject(UsersignupService);

  notificationCount = this.notificationService.notificationCount;

  menuItems: any[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard', 
      route: '/dashboard',
    },
    {
      label: 'Subscriptions',
      icon: 'subscriptions',
      route: '/subscriptions',
    },
    {
      label: 'Services',
      icon: 'miscellaneous_services',
      route: '/services',
    },
    {
      label: 'Subscription Types',
      icon: 'category',
      route: '/subscription-types',
    },
    {
      label: 'Notifications',
      icon: 'notifications',
      route: '/notifications',
    },
  ];
  isDarkMode = false;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    this.notificationService.refreshUnreadCount();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  onLogout() {
    this.authService.logOut().subscribe({
      next: (res) => {
        this.router.navigate(['/login'])
      },
      error: (err) => console.log(err),
    });
  }
}
