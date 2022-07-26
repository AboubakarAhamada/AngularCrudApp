import { TestBed } from '@angular/core/testing';

import { ErrorsMessagesService } from './errors-messages.service';

describe('ErrorsMessagesService', () => {
  let service: ErrorsMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
