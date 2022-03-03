import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActionRequest, Actions } from '../../../../../api/actions';
import { AuthService } from './auth.service';

export abstract class ActionService {
  abstract invoke<T extends keyof Actions>(action: T): Actions[T];
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

  invoke<T extends keyof Actions>(action: T): Actions[T] {
    const invoker = (payload: any) =>
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
    return invoker as unknown as Actions[T];
  }
}
