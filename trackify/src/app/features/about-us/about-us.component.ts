import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  socials: { icon: string; link: string }[];
}

interface Feature {
  title: string;
  desc: string;
  iconPath: string;
}

@Component({
  standalone: true,
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    // 1. Staggered Entrance for Hero Text
    trigger('staggerFade', [
      transition(':enter', [
        query('h1, p, button, .tag-pill', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(150, [
            animate('0.8s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),

    // 2. 3D Dashboard Image Reveal
    trigger('heroImageReveal', [
      state('hidden', style({ 
        opacity: 0, 
        transform: 'perspective(1000px) rotateX(20deg) translateY(50px) scale(0.9)' 
      })),
      state('visible', style({ 
        opacity: 1, 
        transform: 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)' 
      })),
      transition('hidden => visible', [
        animate('1s 0.2s cubic-bezier(0.16, 1, 0.3, 1)')
      ])
    ]),

    // 3. Features List Stagger
    trigger('listAnimation', [
      transition('* => visible', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
          stagger(150, [
            animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ])
      ])
    ]),

    // 4. Team Card Elastic Entrance
    trigger('cardAnimation', [
      transition('* => visible', [
        query('.team-card', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(200, [
            animate('0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),

    // 5. Avatar Pop (Bouncy)
    trigger('avatarPop', [
      transition('* => visible', [
        style({ opacity: 0, transform: 'scale(0) rotate(-15deg)' }),
        animate('0.8s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
      ])
    ])
  ]
})
export class AboutUsComponent implements OnInit {

  private router = inject(Router);

  features: Feature[] = [
    {
      title: 'Deep Analytics',
      desc: 'Visualize your spending habits with intuitive charts. We break down data so you do not have to.',
      iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
    },
    {
      title: 'Subscription Hub',
      desc: 'Keep all your subscriptions in one centralized dashboard. Never miss a renewal date again.',
      iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
    },
    {
      title: 'Smart Savings',
      desc: 'Identify unused subscriptions and price hikes instantly. Stop bleeding money on tools you do not use.',
      iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  team: TeamMember[] = [
    {
      name: 'Nabeel PP',
      role: 'Project Lead',
      // High quality portrait from Unsplash
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      description: 'Visionary behind Trackify. Nabeel specializes in Angular architecture and creating seamless user experiences.',
      socials: [{ icon: 'github', link: '#' }]
    },
    {
      name: 'Rahul Prasad',
      role: 'Strategist',
      // High quality portrait from Unsplash
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      description: 'Rahul ensures Trackify backend is robust and the product meets the real needs of power-users.',
      socials: [{ icon: 'github', link: '#' }]
    }
  ];

  heroState = 'hidden';
  featuresState = 'hidden';
  teamState = 'hidden';

  ngOnInit() {
    setTimeout(() => {
        this.observeSection('.hero-section', 'heroState');
        this.observeSection('.features-section', 'featuresState');
        this.observeSection('.team-section', 'teamState');
    }, 100);
  }

  observeSection(selector: string, stateProp: 'heroState' | 'featuresState' | 'teamState') {
    const section = document.querySelector(selector);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this[stateProp] = 'visible';
          // Optional: Disconnect if you want it to only animate once
          observer.disconnect(); 
        }
      },
      { threshold: 0.2 } // Increased threshold for better triggering
    );

    observer.observe(section);
  }

  gotoSub(){
    this.router.navigate(['/']);
  }

  spotlightX = '-50%';
  spotlightY = '-50%';
  isHovering = false;

  handleSpotlightMove(e: MouseEvent) {
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.spotlightX = `${x}px`;
    this.spotlightY = `${y}px`;
  }
}