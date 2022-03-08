import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogsTestingModule } from '../../logs.testing-module';
import { LogsListViewComponent } from './logs-list-view.component';

describe('LogsListViewComponent', () => {
  let component: LogsListViewComponent;
  let fixture: ComponentFixture<LogsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
