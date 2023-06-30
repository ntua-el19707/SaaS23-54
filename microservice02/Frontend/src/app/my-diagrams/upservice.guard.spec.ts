import { TestBed } from '@angular/core/testing';

import { UpserviceGuard } from './upservice.guard';

describe('UpserviceGuard', () => {
  let guard: UpserviceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpserviceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
