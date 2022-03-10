import { ActionRole } from '@api/actions';
import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/core/services/firebase.service';
import { ActionService } from '../../core/services/action.service';

@Injectable()
export class CreateLogService extends ActionService<Log, Log> {
  readonly requiredRole: ActionRole = ActionRole.user;

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  execute(payload: Log): Observable<Log> {
    return from(
      this.firebaseService.logs.doc().set(<Log>{
        event: payload.event,
        description: payload.description,
        time: Timestamp.now(),
      }),
    ).pipe(map(() => payload));
  }
}
