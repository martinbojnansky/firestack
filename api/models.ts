import { Timestamp } from '../client/node_modules/firebase/firestore';

export interface Log {
  event: string;
  description?: string;
  time: Timestamp;
}

export interface LogCreate extends Pick<Log, 'event' | 'description'> {}
