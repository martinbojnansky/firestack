import { Log } from '@api/models';
import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase.service';
import { ActionService } from '../action.service';

@Injectable()
export class GetLogsService extends ActionService<void, Log[]> {
  constructor(private firebaseService: FirebaseService) {
    super();
  }

  run(): Observable<Log[]> {
    return from(this.firebaseService.logs.get()).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as Log)),
    );
  }
}