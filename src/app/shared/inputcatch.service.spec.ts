import { TestBed } from '@angular/core/testing';

import { InputcatchService } from './inputcatch.service';

describe('InputcatchService', () => {
  let service: InputcatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputcatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
