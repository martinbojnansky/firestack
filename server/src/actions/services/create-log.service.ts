import { ActionRole } from '@api/actions';
import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/core/services/firebase.service';
import { ActionService } from '../../core/services/action.service';

@Injectable()
export class CreateLogService extends ActionService<Log, Log> {
  readonly requiredRole: ActionRole = ActionRole.admin;

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  execute(payload: Log): Observable<Log> {
    return from(this.firebaseService.logs.doc().set(payload)).pipe(
      map(() => payload),
    );
  }
}
