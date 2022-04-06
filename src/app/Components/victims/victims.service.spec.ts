import { TestBed } from '@angular/core/testing';

import { VictimsService } from './victims.service';

describe('VictimsService', () => {
  let service: VictimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
