export type FieldColor = 'blue' | 'red' | 'purple' | undefined;

export interface FieldData {
  content: string;
  color?: FieldColor;
}