import { TestBed } from '@angular/core/testing';

import { ProviderLugaresService } from './provider-lugares.service';

describe('ProviderLugaresService', () => {
  let service: ProviderLugaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderLugaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
