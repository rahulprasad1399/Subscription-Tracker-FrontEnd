import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordNotificationComponent } from './dashbord-notification.component';

describe('DashbordNotificationComponent', () => {
  let component: DashbordNotificationComponent;
  let fixture: ComponentFixture<DashbordNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
