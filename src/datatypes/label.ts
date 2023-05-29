export enum Color {
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
}

export enum Type {
  activity = 'activity',
  recipe = 'recipe'
}

export interface Label {
  name: string;
  color?: string;
  type?: string;
  id: string;
}
