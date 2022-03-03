import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ActionService } from 'src/app/core/services/action.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeViewComponent {
  readonly reloadRequired$ = new BehaviorSubject(true);

  readonly logs$ = this.reloadRequired$.pipe(
    switchMap(() => this.actionService.invoke('getLogs')()),
  );

  constructor(private actionService: ActionService) {}

  createLog() {
    return this.actionService
      .invoke('createLog')({
        message: new Date().toString(),
      })
      .pipe(tap(() => this.reloadRequired$.next(true)));
  }
}
