import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,MatIconModule,CommonModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  menuItems: any[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard', // Material icon name
    route: '/dashboard'
  },
  {
    label: 'Subscriptions',
    icon: 'subscriptions',
    route: '/subscriptions'
  },
  {
    label: 'Services',
    icon: 'miscellaneous_services',
    route: '/services'
  },
  {
    label: 'Subscription Types',
    icon: 'category',
    route: '/subscription-types'
  },
  {
    label: 'Notifications',
    icon: 'notifications',
    route: '/notifications'
  }
];
isDarkMode = true;

ngOnInit() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    this.isDarkMode = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
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

}
