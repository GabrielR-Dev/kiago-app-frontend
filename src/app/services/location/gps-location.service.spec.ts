import { TestBed } from '@angular/core/testing';

import { GpsLocationService } from '../../services/location/gps-location.service';

describe('GpsLocationService', () => {
  let service: GpsLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpsLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
