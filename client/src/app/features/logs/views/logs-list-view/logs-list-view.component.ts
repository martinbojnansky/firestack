import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Log } from '@api/models';
import { effects, Nullable, ObservableUnsubscriber } from 'ng-toolkit-lib';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ActionService } from 'src/app/core/services/action.service';

@Component({
  selector: 'app-logs-list-view',
  templateUrl: './logs-list-view.component.html',
  styleUrls: ['./logs-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsListViewComponent implements OnInit, OnDestroy {
  private readonly unsubscriber = new ObservableUnsubscriber();

  readonly logs$ = new BehaviorSubject<Log[]>([]);
  readonly logsError$ = new BehaviorSubject<unknown>(null); // TODO: Use type and translations
  readonly updatingLogs$ = new BehaviorSubject(false);

  readonly createLog$ = new BehaviorSubject<Nullable<Log>>(null);
  readonly createLogError$ = new BehaviorSubject<unknown>(null); // TODO: Use type and translations
  readonly creatingLog$ = new BehaviorSubject<boolean>(false);

  readonly busy$ = combineLatest([this.updatingLogs$, this.creatingLog$]).pipe(
    map((vs) => vs.some((v) => !!v)),
  );

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.updateLogs();
  }

  ngOnDestroy(): void {
    this.unsubscriber.destroy();
  }

  updateLogs(): void {
    this.actionService
      .get('getLogs')()
      .pipe(
        effects({
          started: () => {
            this.updatingLogs$.next(true);
            this.logsError$.next(null);
          },
          completed: (logs) => {
            this.updatingLogs$.next(false);
            this.logs$.next(logs);
          },
          failed: (e) => {
            this.logsError$.next(e);
            this.updatingLogs$.next(false);
          },
        }),
        this.unsubscriber.onDestroyOrResubscribe('updateLogs'),
      )
      .subscribe();
  }

  createLog(log: Log): void {
    this.actionService
      .get('createLog')({
        event: log.event,
        description: log.description,
      })
      .pipe(
        effects({
          started: () => {
            this.creatingLog$.next(true);
            this.createLogError$.next(null);
          },
          completed: (log) => {
            this.creatingLog$.next(false);
            this.logs$.next([log, ...this.logs$.value]); // Or you can call this.updateLogs(); instead.
            this.createLog$.next(null);
          },
          failed: (e) => {
            this.createLogError$.next(e);
            this.creatingLog$.next(false);
          },
        }),
        this.unsubscriber.onDestroy(),
      )
      .subscribe();
  }
}
