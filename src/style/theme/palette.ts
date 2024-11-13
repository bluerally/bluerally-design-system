type DefaultColorVariant = '20' | '50' | '100' | '150' | '200' | '300' | '400';

type GrayColorVariant =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '900';
type SubColorVariant = '50' | '100' | '150' | '200' | '300' | '400';

export type PrimaryColorType = { [variant in DefaultColorVariant]: string };
export type GrayColorType = { [variant in GrayColorVariant]: string };
export type SubColorType = { [variant in SubColorVariant]: string };

const primaryColors: PrimaryColorType = {
  '20': '#F2F5FF',
  '50': '#E5EAFF',
  '100': '#CFD7FF',
  '150': '#8C9BFF',
  '200': '#647EFF',
  '300': '#3C3CFF',
  '400': '#2D2DC8',
};

const grayColors: GrayColorType = {
  '50': '#FAFAFA',
  '100': '#F5F5F5',
  '200': '#ECECEC',
  '300': '#D4D4D4',
  '400': '#A3A3A3',
  '500': '#808080',
  '600': '#595959',
  '900': '#0A0A0A',
};

const errorColors: SubColorType = {
  '50': '#FEF2F2',
  '100': '#FEE2E2',
  '150': '#FECACA',
  '200': '#EF4444',
  '300': '#DC2626',
  '400': '#B91C1C',
};

export const palette = {
  primary: primaryColors,
  error: errorColors,
  black: '#000',
  white: '#fff',
  gray: grayColors,
  success: '#2db362',
  warning: '#ffc750',
};
