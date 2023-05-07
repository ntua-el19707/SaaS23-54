import { TestBed } from '@angular/core/testing';

import { HttpIInterceptor } from './http-i.interceptor';

describe('HttpIInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpIInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpIInterceptor = TestBed.inject(HttpIInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
