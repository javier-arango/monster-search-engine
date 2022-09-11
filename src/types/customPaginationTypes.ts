export interface Column {
  id: "securityID" | "streetIDType";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface Data {
  securityID: string;
  streetIDType: string;
}
