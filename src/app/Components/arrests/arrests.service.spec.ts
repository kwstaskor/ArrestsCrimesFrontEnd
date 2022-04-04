import { TestBed } from '@angular/core/testing';

import { ArrestsService } from './arrests.service';

describe('ArrestsService', () => {
  let service: ArrestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
