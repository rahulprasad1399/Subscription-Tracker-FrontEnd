import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordUpcomingRenewalsComponent } from './dashbord-upcoming-renewals.component';

describe('DashbordUpcomingRenewalsComponent', () => {
  let component: DashbordUpcomingRenewalsComponent;
  let fixture: ComponentFixture<DashbordUpcomingRenewalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordUpcomingRenewalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordUpcomingRenewalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
