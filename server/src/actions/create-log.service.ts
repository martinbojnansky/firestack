import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase.service';
import { ActionService } from '../action.service';

@Injectable()
export class CreateLogService extends ActionService<Log, Log> {
  constructor(private firebaseService: FirebaseService) {
    super();
  }

  run(payload: Log): Observable<Log> {
    return from(this.firebaseService.logs.doc().set(payload)).pipe(
      map(() => payload),
    );
  }
}
