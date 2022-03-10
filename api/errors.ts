export interface ActionErrors {
  invalid: any;
  deprecated: {
    because: string;
  };
  unsupported: {
    because: string;
  };
}
