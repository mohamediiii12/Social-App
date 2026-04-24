import { TestBed } from '@angular/core/testing';

import { ShowPassService } from './show-pass.service';

describe('ShowPassService', () => {
  let service: ShowPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
