export interface Actions {
  getAll: (query: string) => Promise<string[]>;
  getOne: (id: string) => Promise<string>;
}

export interface ActionRequest {
  action: keyof Actions;
  payload: unknown;
}
