import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSummaryCardsComponent } from './dashbord-summary-cards.component';

describe('DashbordSummaryCardsComponent', () => {
  let component: DashbordSummaryCardsComponent;
  let fixture: ComponentFixture<DashbordSummaryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordSummaryCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
