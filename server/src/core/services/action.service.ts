import { ActionRole, actionRolesMap } from '@api/actions';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { catchError, from, map, Observable, of } from 'rxjs';

export abstract class ActionService<TPayload, TRes> {
  abstract requiredRole: ActionRole;

  preAuthorize(request: Request): Observable<void> {
    if (this.requiredRole === null) {
      return of(void 0);
    }

    if (
      !request.headers?.authorization ||
      !request.headers?.authorization?.startsWith('Bearer ')
    ) {
      throw new UnauthorizedException(
        'Authorization header not provided or incorrect.',
      );
    } else {
      return from(
        getAuth().verifyIdToken(request.headers.authorization.split(' ')[1]),
      ).pipe(
        map((token: DecodedIdToken & { role: ActionRole }) => {
          // Get role from token and default it to "user" for all signed in users.
          const tokenRole: ActionRole = token?.role || ActionRole.user;
          if (!actionRolesMap[tokenRole].includes(this.requiredRole)) {
            throw new ForbiddenException('Insufficient user role.');
          }
        }),
        catchError((err) => {
          if (err instanceof ForbiddenException) {
            throw err;
          } else {
            throw new UnauthorizedException('User authorization failed.');
          }
        }),
      );
    }
  }

  abstract execute(payload: TPayload): Observable<TRes>;
}
