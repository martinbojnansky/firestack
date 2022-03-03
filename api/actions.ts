import { Log } from './models';

export interface Actions {
  getLogs: () => Promise<Log[]>;
  createLog: (log: Log) => Promise<Log>;
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
