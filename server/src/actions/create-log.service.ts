import { ActionRole } from '@api/actions';
import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase.service';
import { ActionService } from '../action.service';

@Injectable()
export class CreateLogService extends ActionService<Log, Log> {
  readonly roles = [ActionRole.editor];

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  execute(payload: Log): Observable<Log> {
    return from(this.firebaseService.logs.doc().set(payload)).pipe(
      map(() => payload),
    );
  }
}
