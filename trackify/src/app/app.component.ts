import { Component, NgZone, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'trackify';
  // Coordinates
  mouseX = 0;
  mouseY = 0;
  followerX = 0;
  followerY = 0;

  // Animation Frame ID (to stop it later)
  animationFrameId: number | null = null;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const mainCursor = document.getElementById('mainCursor');
    const followerCursor = document.getElementById('followerCursor');

    // Run outside Angular to maintain 60FPS performance
    this.ngZone.runOutsideAngular(() => {

      document.addEventListener('mousemove', (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (mainCursor) {
      // Direct mapping: The top-left of the SVG (the tip) is the mouse position
      mainCursor.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    }
  });

  // 2. Track Mouse for Follower Ring (Delayed)
  const animate = () => {
    this.followerX += (this.mouseX - this.followerX) * 0.1;
    this.followerY += (this.mouseY - this.followerY) * 0.1;

    if (followerCursor) {
      // The follower still needs centering (-20px is half of 40px width)
      followerCursor.style.transform = `translate3d(${this.followerX - 20}px, ${this.followerY - 20}px, 0)`;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };
  
  animate();

      // 3. Hover Effects (Optional)
      // ... inside ngAfterViewInit / runOutsideAngular
document.addEventListener('mouseover', (e) => {
  const target = e.target as HTMLElement;
  // Check for buttons, links, or inputs
  if (target.closest('a, button, input, [role="button"]')) {
    document.body.classList.add('cursor-hover');
  }
});

document.addEventListener('mouseout', (e) => {
  const target = e.target as HTMLElement;
  if (target.closest('a, button, input, [role="button"]')) {
    document.body.classList.remove('cursor-hover');
  }
});
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}