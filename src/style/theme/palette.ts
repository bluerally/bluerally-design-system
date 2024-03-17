type DefaultColorVariant =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | 'main';

type NewDefaultColorVariant =
  | '50'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

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
type StatusColorVariant = '50' | '200' | '600' | '700';

export type PrimaryColorType = { [variant in DefaultColorVariant]: string };
export type NewPrimaryColorType = {
  [variant in NewDefaultColorVariant]: string;
};
export type GrayColorType = { [variant in GrayColorVariant]: string };
export type SubColorType = { [variant in SubColorVariant]: string };
export type StatusColorType = { [variant in StatusColorVariant]: string };

const primaryColors: PrimaryColorType = {
  main: '#3751FF', // 400
  '50': '#F7F8FC',
  '100': '#F0F4FF',
  '200': '#DDE4FF',
  '300': '#6486FF',
  '400': '#3751FF',
  '500': '#2F49A8',
};

const skyColors: NewPrimaryColorType = {
  '50': '#EFF2FF',
  '100': '#DAE2FF',
  '150': '#C8D3FF',
  '200': '#B5C4FF',
  '300': '#91A7FF',
  '400': '#6C89FF',
  '500': '#476CFF',
  '600': '#3958D2',
  '700': '#2B43A5',
  '800': '#1C2F78',
  '900': '#0E1A4B',
  '950': '#071035',
};

const grayColors: NewPrimaryColorType = {
  '50': '#fafafa',
  '100': '#f4f4f5',
  '150': '#F0F0F0',
  '200': '#e4e4e5',
  '300': '#d4d4d8',
  '400': '#a1a1aa',
  '500': '#71717a',
  '600': '#52525b',
  '700': '#3f3f46',
  '800': '#27272a',
  '900': '#18181b',
  '950': '#09090b',
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

const newErrorColors: StatusColorType = {
  '50': '#fff1f2',
  '200': '#F4A1A6',
  '600': '#e11d48',
  '700': '#C51239',
};

export const palette = {
  primary: primaryColors,
  gray: grayscaleColors,
  error: errorColors,
  success: successColors,
  warning: warningColors,
  black: '#000',
  white: '#FFFFFF',
  sky: skyColors,
  newGray: grayColors,
  newError: newErrorColors,
};
