import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesLayoutComponent } from './services-layout.component';

describe('ServicesLayoutComponent', () => {
  let component: ServicesLayoutComponent;
  let fixture: ComponentFixture<ServicesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
