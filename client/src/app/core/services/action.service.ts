import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActionRequest, Actions } from '../../../../../api/actions';
import { AuthService } from './auth.service';

export abstract class ActionService {
  abstract get<
    TKey extends keyof Actions,
    TPayload = Actions[TKey][0],
    TResponse = Actions[TKey][1],
    TInvoker = (payload: TPayload) => Observable<TResponse>,
  >(action: TKey): TInvoker;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseActionService extends ActionService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {
    super();
  }

  get<
    TKey extends keyof Actions,
    TPayload = Actions[TKey][0],
    TResponse = Actions[TKey][1],
    TInvoker = (payload: TPayload) => Observable<TResponse>,
  >(action: TKey): TInvoker {
    const invoker = (payload: TPayload) =>
      this.authService.token$.pipe(
        switchMap((token) =>
          this.httpClient.post(
            environment.actionsUrl,
            { action: action, payload: payload } as ActionRequest,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            },
          ),
        ),
      );
    return invoker as unknown as TInvoker;
  }
}
