import { TestBed } from '@angular/core/testing';

import { DonwloadService } from './donwload.service';

describe('DonwloadService', () => {
  let service: DonwloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonwloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
