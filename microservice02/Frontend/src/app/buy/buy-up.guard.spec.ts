import { TestBed } from '@angular/core/testing';

import { BuyUpGuard } from './buy-up.guard';

describe('BuyUpGuard', () => {
  let guard: BuyUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuyUpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
