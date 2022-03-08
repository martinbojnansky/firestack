import { Log } from './models';

export interface Actions {
  getLogs: [void, Log[]];
  createLog: [Log, Log];
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

export interface Observable<T> {}
