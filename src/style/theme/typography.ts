import { SerializedStyles, css } from '@emotion/react';

export type TypographyVariant =
  | 'basic'
  | 'basic-2'
  | 'sm'
  | 'sm-2'
  | 'md'
  | 'md-2'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type TypographyWeight =
  | 'lighter'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold';

type Typography = {
  [variant in TypographyVariant]: {
    [variant in TypographyWeight]: SerializedStyles;
  };
};

export enum FontWeight {
  lighter = 300,
  regular = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
}

export const typography: Typography = {
  basic: {
    lighter: css`
      font-size: 12px;
      font-weight: ${FontWeight.lighter};
      line-height: 18px;
    `,
    regular: css`
      font-size: 12px;
      font-weight: ${FontWeight.regular};
      line-height: 18px;
    `,
    medium: css`
      font-size: 12px;
      font-weight: ${FontWeight.medium};
      line-height: 18px;
    `,
    semiBold: css`
      font-size: 12px;
      font-weight: ${FontWeight.semiBold};
      line-height: 18px;
    `,
    bold: css`
      font-size: 12px;
      font-weight: ${FontWeight.bold};
      line-height: 18px;
    `,
  },
  sm: {
    lighter: css`
      font-size: 10px;
      font-weight: ${FontWeight.lighter};
      line-height: 15px;
    `,
    regular: css`
      font-size: 10px;
      font-weight: ${FontWeight.regular};
      line-height: 15px;
    `,
    medium: css`
      font-size: 10px;
      font-weight: ${FontWeight.medium};
      line-height: 15px;
    `,
    semiBold: css`
      font-size: 10px;
      font-weight: ${FontWeight.semiBold};
      line-height: 15px;
    `,
    bold: css`
      font-size: 10px;
      font-weight: ${FontWeight.bold};
      line-height: 15px;
    `,
  },
  'sm-2': {
    lighter: css`
      font-size: 11px;
      font-weight: ${FontWeight.lighter};
      line-height: 17px;
    `,
    regular: css`
      font-size: 11px;
      font-weight: ${FontWeight.regular};
      line-height: 17px;
    `,
    medium: css`
      font-size: 11px;
      font-weight: ${FontWeight.medium};
      line-height: 17px;
    `,
    semiBold: css`
      font-size: 11px;
      font-weight: ${FontWeight.semiBold};
      line-height: 17px;
    `,
    bold: css`
      font-size: 11px;
      font-weight: ${FontWeight.bold};
      line-height: 17px;
    `,
  },
  'basic-2': {
    lighter: css`
      font-size: 13px;
      font-weight: ${FontWeight.lighter};
      line-height: 19.5px;
    `,
    regular: css`
      font-size: 13px;
      font-weight: ${FontWeight.regular};
      line-height: 19.5px;
    `,
    medium: css`
      font-size: 13px;
      font-weight: ${FontWeight.medium};
      line-height: 19.5px;
    `,
    semiBold: css`
      font-size: 13px;
      font-weight: ${FontWeight.semiBold};
      line-height: 19.5px;
    `,
    bold: css`
      font-size: 13px;
      font-weight: ${FontWeight.bold};
      line-height: 19.5px;
    `,
  },
  md: {
    lighter: css`
      font-size: 14px;
      font-weight: ${FontWeight.lighter};
      line-height: 21px;
    `,
    regular: css`
      font-size: 14px;
      font-weight: ${FontWeight.regular};
      line-height: 21px;
    `,
    medium: css`
      font-size: 14px;
      font-weight: ${FontWeight.medium};
      line-height: 21px;
    `,
    semiBold: css`
      font-size: 14px;
      font-weight: ${FontWeight.semiBold};
      line-height: 21px;
    `,
    bold: css`
      font-size: 14px;
      font-weight: ${FontWeight.bold};
      line-height: 21px;
    `,
  },
  'md-2': {
    lighter: css`
      font-size: 15px;
      font-weight: ${FontWeight.lighter};
      line-height: 22.5px;
    `,
    regular: css`
      font-size: 15px;
      font-weight: ${FontWeight.regular};
      line-height: 22.5px;
    `,
    medium: css`
      font-size: 15px;
      font-weight: ${FontWeight.medium};
      line-height: 22.5px;
    `,
    semiBold: css`
      font-size: 15px;
      font-weight: ${FontWeight.semiBold};
      line-height: 22.5px;
    `,
    bold: css`
      font-size: 15px;
      font-weight: ${FontWeight.bold};
      line-height: 22.5px;
    `,
  },
  lg: {
    lighter: css`
      font-size: 16px;
      font-weight: ${FontWeight.lighter};
      line-height: 24px;
    `,
    regular: css`
      font-size: 16px;
      font-weight: ${FontWeight.regular};
      line-height: 24px;
    `,
    medium: css`
      font-size: 16px;
      font-weight: ${FontWeight.medium};
      line-height: 24px;
    `,
    semiBold: css`
      font-size: 16px;
      font-weight: ${FontWeight.semiBold};
      line-height: 24px;
    `,
    bold: css`
      font-size: 16px;
      font-weight: ${FontWeight.bold};
      line-height: 24px;
    `,
  },
  xl: {
    lighter: css`
      font-size: 18px;
      font-weight: ${FontWeight.lighter};
      line-height: 27px;
    `,
    regular: css`
      font-size: 18px;
      font-weight: ${FontWeight.regular};
      line-height: 27px;
    `,
    medium: css`
      font-size: 18px;
      font-weight: ${FontWeight.medium};
      line-height: 27px;
    `,
    semiBold: css`
      font-size: 18px;
      font-weight: ${FontWeight.semiBold};
      line-height: 27px;
    `,
    bold: css`
      font-size: 18px;
      font-weight: ${FontWeight.bold};
      line-height: 27px;
    `,
  },
  '2xl': {
    lighter: css`
      font-size: 20px;
      font-weight: ${FontWeight.lighter};
      line-height: 30px;
    `,
    regular: css`
      font-size: 20px;
      font-weight: ${FontWeight.regular};
      line-height: 30px;
    `,
    medium: css`
      font-size: 20px;
      font-weight: ${FontWeight.medium};
      line-height: 30px;
    `,
    semiBold: css`
      font-size: 20px;
      font-weight: ${FontWeight.semiBold};
      line-height: 30px;
    `,
    bold: css`
      font-size: 20px;
      font-weight: ${FontWeight.bold};
      line-height: 30px;
    `,
  },
  '3xl': {
    lighter: css`
      font-size: 22px;
      font-weight: ${FontWeight.lighter};
      line-height: 33px;
    `,
    regular: css`
      font-size: 22px;
      font-weight: ${FontWeight.regular};
      line-height: 33px;
    `,
    medium: css`
      font-size: 22px;
      font-weight: ${FontWeight.medium};
      line-height: 33px;
    `,
    semiBold: css`
      font-size: 22px;
      font-weight: ${FontWeight.semiBold};
      line-height: 33px;
    `,
    bold: css`
      font-size: 22px;
      font-weight: ${FontWeight.bold};
      line-height: 33px;
    `,
  },
  '4xl': {
    lighter: css`
      font-size: 24px;
      font-weight: ${FontWeight.lighter};
      line-height: 36px;
    `,
    regular: css`
      font-size: 24px;
      font-weight: ${FontWeight.regular};
      line-height: 36px;
    `,
    medium: css`
      font-size: 24px;
      font-weight: ${FontWeight.medium};
      line-height: 36px;
    `,
    semiBold: css`
      font-size: 24px;
      font-weight: ${FontWeight.semiBold};
      line-height: 36px;
    `,
    bold: css`
      font-size: 24px;
      font-weight: ${FontWeight.bold};
      line-height: 36px;
    `,
  },
  '5xl': {
    lighter: css`
      font-size: 26px;
      font-weight: ${FontWeight.lighter};
      line-height: 39px;
    `,
    regular: css`
      font-size: 26px;
      font-weight: ${FontWeight.regular};
      line-height: 39px;
    `,
    medium: css`
      font-size: 26px;
      font-weight: ${FontWeight.medium};
      line-height: 39px;
    `,
    semiBold: css`
      font-size: 26px;
      font-weight: ${FontWeight.semiBold};
      line-height: 39px;
    `,
    bold: css`
      font-size: 26px;
      font-weight: ${FontWeight.bold};
      line-height: 39px;
    `,
  },
  '6xl': {
    lighter: css`
      font-size: 32px;
      font-weight: ${FontWeight.lighter};
      line-height: 48px;
    `,
    regular: css`
      font-size: 32px;
      font-weight: ${FontWeight.regular};
      line-height: 48px;
    `,
    medium: css`
      font-size: 32px;
      font-weight: ${FontWeight.medium};
      line-height: 48px;
    `,
    semiBold: css`
      font-size: 32px;
      font-weight: ${FontWeight.semiBold};
      line-height: 48px;
    `,
    bold: css`
      font-size: 32px;
      font-weight: ${FontWeight.bold};
      line-height: 48px;
    `,
  },
};
