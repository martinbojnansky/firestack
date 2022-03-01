import { Observable } from 'rxjs';

export abstract class ActionService<TPayload, TRes> {
  abstract run(payload: TPayload): Observable<TRes>;
}
