import { TestBed } from '@angular/core/testing';

import { CarInsuranceService } from './car-insurance.service';

describe('CarInsuranceService', () => {
  let service: CarInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
