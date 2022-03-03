import { ActionRole } from '@api/actions';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';

export abstract class ActionService<TPayload, TRes> {
  abstract roles: ActionRole[];

  preAuthorize(request: Request): Observable<true> {
    if (this.roles?.length) {
      if (!request.headers?.authorization) {
        throw new UnauthorizedException('Authorization header not provided.');
      } else {
        throw new UnauthorizedException('Authorization not implemented.');
      }
    }

    return of(true);
  }

  abstract execute(payload: TPayload): Observable<TRes>;
}
