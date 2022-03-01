import { Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';
import { ActionService } from '../action.service';

@Injectable()
export class GetOneService extends ActionService<string, string> {
  run(payload: string): Observable<string> {
    return of(payload).pipe(delay(500));
  }
}
