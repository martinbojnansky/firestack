import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(protected authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthorized();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthorized();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthorized();
  }

  protected isAuthorized(): Observable<boolean> {
    return this.authService.user$.pipe(
      filter((user) => user !== undefined),
      take(1),
      switchMap((user) => {
        if (!user) {
          return this.authService.signIn().pipe(map(() => false));
        } else {
          return of(true);
        }
      }),
    );
  }
}
