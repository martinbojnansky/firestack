import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionRequest, Actions } from '../../../../../api/actions';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(protected httpClient: HttpClient) {}

  invoke<T extends keyof Actions>(action: T): Actions[T] {
    const invoker = (payload: any) =>
      this.httpClient.post(
        environment.actionsUrl,
        { action: action, payload: payload } as ActionRequest,
        {
          headers: {
            Authorization: '', // TODO
          },
        },
      );
    return invoker as unknown as Actions[T];
  }
}
