import { Observable } from '../client/node_modules/rxjs';
import { Log } from './models';

export interface Actions {
  getLogs: () => Observable<Log[]>;
  createLog: (log: Log) => Observable<Log>;
}

export interface ActionRequest {
  action: keyof Actions;
  payload: unknown;
}

export enum ActionRole {
  viewer = 'viewer',
  editor = 'editor',
  admin = 'admin',
}
