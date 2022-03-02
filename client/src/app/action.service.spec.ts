import { TestBed } from '@angular/core/testing';
import { ActionService } from './action.service';
import { AppTestingModule } from './app.testing-module';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
