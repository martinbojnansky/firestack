import { ActionRole } from '@api/actions';
import { Log, LogCreate, logCreateSchema } from '@api/models';
import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/core/services/firebase.service';
import { ActionService } from '../../core/services/action.service';

@Injectable()
export class CreateLogService extends ActionService<LogCreate, Log> {
  readonly requiredRole: ActionRole = ActionRole.user;
  readonly schema = logCreateSchema;

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  execute(payload: LogCreate): Observable<Log> {
    const now = Timestamp.now();
    const log: Log = {
      ...payload,
      time: {
        _seconds: now.seconds,
        _nanoseconds: now.nanoseconds,
      },
    };
    return from(this.firebaseService.logs.doc().set(log)).pipe(map(() => log));
  }
}
