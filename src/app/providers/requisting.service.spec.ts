import { TestBed } from '@angular/core/testing';

import { RequistingService } from './requisting.service';

describe('RequistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequistingService = TestBed.get(RequistingService);
    expect(service).toBeTruthy();
  });
});
