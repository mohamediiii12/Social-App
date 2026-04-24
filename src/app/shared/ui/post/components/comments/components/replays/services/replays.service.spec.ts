import { TestBed } from '@angular/core/testing';

import { ReplaysService } from './replays.service';

describe('ReplaysService', () => {
  let service: ReplaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
