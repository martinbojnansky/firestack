import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase.service';
import { Log } from '../../../api/models';
import { ActionService } from '../action.service';

@Injectable()
export class CreateLogService extends ActionService<Log, Log> {
  constructor(private firebaseService: FirebaseService) {
    super();
  }

  run(payload: Log): Observable<Log> {
    const docRef = this.firebaseService.db.collection('logs').doc();
    return from(docRef.set(payload)).pipe(map(() => payload));
  }
}
