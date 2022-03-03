import { TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '../core.testing-module';
import { ActionService } from './action.service';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule],
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
