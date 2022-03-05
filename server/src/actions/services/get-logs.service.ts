import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { ActionError } from 'src/core/models/action-error';
import { FirebaseService } from 'src/core/services/firebase.service';
import { ActionService } from '../../core/services/action.service';

@Injectable()
export class GetLogsService extends ActionService<void, Log[]> {
  readonly public = true;

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  execute(): Observable<Log[]> {
    return from(this.firebaseService.logs.get()).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Log)),
    );
  }
}

@Injectable()
export class FailingGetLogsService extends GetLogsService {
  execute(): Observable<Log[]> {
    throw ActionError.of('deprecated', { because: 'I said so.' }).and(
      'unsupported',
      { because: 'Simply deprecated...' },
    );
  }
}
