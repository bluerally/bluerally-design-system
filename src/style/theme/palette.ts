type DefaultColorVariant =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | 'main';
type GrayColorVariant =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | 'main';
type SubColorVariant = '50' | '300' | '600' | 'main';

export type PrimaryColorType = { [variant in DefaultColorVariant]: string };
export type GrayColorType = { [variant in GrayColorVariant]: string };
export type SubColorType = { [variant in SubColorVariant]: string };

const primaryColors: PrimaryColorType = {
  main: '#3751FF', // 400
  '50': '#F7F8FC',
  '100': '#F0F4FF',
  '200': '#DDE4FF',
  '300': '#6486FF',
  '400': '#3751FF',
  '500': '#2F49A8',
};

const grayscaleColors: GrayColorType = {
  main: '#8B8F9F', // 400
  '50': '#F9FAFC',
  '100': '#E9EBEE',
  '200': '#D8D9DF',
  '300': '#A4A7B3',
  '400': '#8B8F9F',
  '500': '#565C69',
  '600': '#363740',
  '700': '#14171F',
};

const errorColors: SubColorType = {
  main: '#DD331D', // 300
  '50': '#FFF3F2',
  '300': '#DD331D',
  '600': '#AB2816',
};

const successColors: SubColorType = {
  main: '#98C729', // 300
  '50': '#F4FDDD',
  '300': '#98C729',
  '600': '#58790C',
};

const warningColors: SubColorType = {
  main: '#E8B93F', // 300
  '50': '#FFF9EB',
  '300': '#E8B93F',
  '600': '#82620F',
};

export const palette = {
  primary: primaryColors,
  gray: grayscaleColors,
  error: errorColors,
  success: successColors,
  warning: warningColors,
  black: grayscaleColors['700'],
  white: '#FFFFFF',
};
