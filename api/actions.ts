import { Observable } from '../client/node_modules/rxjs';
import { Log } from './models';

export interface Actions {
  getLogs: () => Observable<Log[]>;
  createLog: (log: Log) => Observable<Log>;
}

export interface ActionErrors {
  deprecated: {
    because: string;
  };
  unsupported: {
    because: string;
  };
}

export interface ActionRequest {
  action: keyof Actions;
  payload: unknown;
}
