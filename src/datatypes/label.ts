export enum Color {
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  /*tertiary  = 'tertiary',*/
  success = 'success',
  /*warning = 'warning',
  light  = 'light',
  medium = 'medium',
  dark = 'dark'*/
}

export enum Type {
  activity = 'activity',
  /*recipe = 'recipe'*/
}

export interface Label {
  name: string;
  color?: Color;
  id: number;
  type?: string;
}
