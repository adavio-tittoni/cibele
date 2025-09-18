export type FieldColor = 'blue' | 'red' | 'purple' | undefined;

export interface BulletPoint {
  id: string;
  text: string;
  color: FieldColor;
}

export interface FieldData {
  content: string;
  color?: FieldColor;
  bulletPoints?: BulletPoint[];
}