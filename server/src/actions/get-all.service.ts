import { Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';
import { ActionService } from '../action.service';

@Injectable()
export class GetAllService extends ActionService<string, string[]> {
  run(payload: string): Observable<string[]> {
    return of([...payload.split('_'), 'd']).pipe(delay(500));
  }
}
