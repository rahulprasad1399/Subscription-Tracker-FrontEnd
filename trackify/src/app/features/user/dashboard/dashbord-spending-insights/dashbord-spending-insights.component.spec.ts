import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSpendingInsightsComponent } from './dashbord-spending-insights.component';

describe('DashbordSpendingInsightsComponent', () => {
  let component: DashbordSpendingInsightsComponent;
  let fixture: ComponentFixture<DashbordSpendingInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordSpendingInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordSpendingInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
