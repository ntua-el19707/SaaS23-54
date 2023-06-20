import { TestBed } from '@angular/core/testing';

import { DiagramsModuleGuard } from './diagrams-module.guard';

describe('DiagramsModuleGuard', () => {
  let guard: DiagramsModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DiagramsModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
