import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { catchError, from, map, Observable, of } from 'rxjs';

export abstract class ActionService<TPayload, TRes> {
  abstract public: boolean;

  preAuthorize(request: Request): Observable<void> {
    if (this.public) {
      return of(void 0);
    }

    if (!request.headers?.authorization) {
      throw new UnauthorizedException('Authorization header not provided.');
    } else {
      return from(
        getAuth().verifyIdToken(request.headers.authorization.split(' ')[1]),
      ).pipe(
        map((token) => {}),
        catchError((err) => {
          throw new UnauthorizedException('Authorization token invalid.');
        }),
      );
    }
  }

  abstract execute(payload: TPayload): Observable<TRes>;
}
