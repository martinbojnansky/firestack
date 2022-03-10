import { Log, LogCreate } from './models';

export interface Actions {
  getLogs: [void, Log[]];
  createLog: [LogCreate, Log];
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
