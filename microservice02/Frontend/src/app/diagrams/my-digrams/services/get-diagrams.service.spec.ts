import { TestBed } from '@angular/core/testing';

import { GetDiagramsService } from './get-diagrams.service';

describe('GetDiagramsService', () => {
  let service: GetDiagramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDiagramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
