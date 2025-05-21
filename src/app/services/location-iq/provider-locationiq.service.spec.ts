import { TestBed } from '@angular/core/testing';

import { ProviderLocationiqService } from './provider-locationiq.service';

describe('ProviderLocationiqService', () => {
  let service: ProviderLocationiqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderLocationiqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
