export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Log {
  event: string;
  description: string | null;
  time: Timestamp;
}

export type LogCreate = Pick<Log, 'event' | 'description'>;
