import { TestBed } from '@angular/core/testing';

import { SubscriptionTypeService } from './subscription-type.service';

describe('SubscriptionTypeService', () => {
  let service: SubscriptionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
