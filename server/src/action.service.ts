import { ActionRole } from '@api/actions';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { from, map, Observable, of } from 'rxjs';

export abstract class ActionService<TPayload, TRes> {
  abstract roles: ActionRole[];

  preAuthorize(request: Request): Observable<true> {
    if (this.roles?.length) {
      if (!request.headers?.authorization) {
        throw new UnauthorizedException('Authorization header not provided.');
      } else {
        from(
          getAuth().verifyIdToken(request.headers.authorization.split(' ')[1]),
        ).pipe(
          map((token) => {
            return !!token;
          }),
        );
      }
    }

    return of(true);
  }

  abstract execute(payload: TPayload): Observable<TRes>;
}
