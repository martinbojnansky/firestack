import { Component } from '@angular/core';
import { BehaviorSubject, from, switchMap, tap } from 'rxjs';
import { ActionService } from './action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firestack';

  readonly reloadRequired$ = new BehaviorSubject(true);

  readonly logs$ = this.reloadRequired$.pipe(
    switchMap(() => from(this.actionService.invoke('getLogs')())),
  );

  constructor(private actionService: ActionService) {}

  createLog() {
    return from(
      this.actionService.invoke('createLog')({
        message: new Date().toString(),
      }),
    ).pipe(tap(() => this.reloadRequired$.next(true)));
  }
}
