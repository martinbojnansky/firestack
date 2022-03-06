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

export enum ActionRole {
  none = 'none',
  user = 'user',
  admin = 'admin',
}

export const actionRolesMap: {
  [key in keyof typeof ActionRole]: (keyof typeof ActionRole)[];
} = {
  none: [],
  user: ['user'],
  admin: ['none', 'user', 'admin'],
};

export interface ActionRequest {
  action: keyof Actions;
  payload: unknown;
}
