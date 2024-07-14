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
  '20': '#F6F9FF',
  '50': '#EFF2FF',
  '100': '#D7E2FF',
  '150': '#7894FF',
  '200': '#425CE7',
  '300': '#3C58F3',
  '400': '#2139BB',
};

const grayColors: GrayColorType = {
  '50': '#fafafa',
  '100': '#f4f4f5',
  '200': '#F0F0F0',
  '300': '#E4E4E7',
  '400': '#a1a1aa',
  '500': '#73737A',
  '600': '#52525b',
  '900': '#0D0D0D',
};

const errorColors: SubColorType = {
  '50': '#FEEEEF',
  '100': '#FFDCDD',
  '150': '#FFB1B6',
  '200': '#F23A62',
  '300': '#e11d48',
  '400': '#C51239',
};

export const palette = {
  primary: primaryColors,
  error: errorColors,
  black: '#000',
  white: '#fff',
  gray: grayColors,
};
