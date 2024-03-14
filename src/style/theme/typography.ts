import { css, SerializedStyles } from '@emotion/react';

export type TypographyVariant =
  | 'basic'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type TypographyWeight = 'regular' | 'medium' | 'bold';

type Typography = {
  [variant in TypographyVariant]: {
    [variant in TypographyWeight]: SerializedStyles;
  };
};

export enum FontWeight {
  regular = 400,
  medium = 500,
  bold = 700,
}

export const typography: Typography = {
  basic: {
    regular: css`
      font-size: 12px;
      font-weight: ${FontWeight.regular};
      line-height: 14px;
    `,
    medium: css`
      font-size: 12px;
      font-weight: ${FontWeight.medium};
      line-height: 14px;
    `,
    bold: css`
      font-size: 12px;
      font-weight: ${FontWeight.bold};
      line-height: 14px;
    `,
  },
  sm: {
    regular: css`
      font-size: 11px;
      font-weight: ${FontWeight.regular};
      line-height: 13px;
    `,
    medium: css`
      font-size: 11px;
      font-weight: ${FontWeight.medium};
      line-height: 13px;
    `,
    bold: css`
      font-size: 11px;
      font-weight: ${FontWeight.bold};
      line-height: 13px;
    `,
  },
  md: {
    regular: css`
      font-size: 14px;
      font-weight: ${FontWeight.regular};
      line-height: 17px;
    `,
    medium: css`
      font-size: 14px;
      font-weight: ${FontWeight.medium};
      line-height: 17px;
    `,
    bold: css`
      font-size: 14px;
      font-weight: ${FontWeight.bold};
      line-height: 17px;
    `,
  },
  lg: {
    regular: css`
      font-size: 16px;
      font-weight: ${FontWeight.regular};
      line-height: 19px;
    `,
    medium: css`
      font-size: 16px;
      font-weight: ${FontWeight.medium};
      line-height: 19px;
    `,
    bold: css`
      font-size: 16px;
      font-weight: ${FontWeight.bold};
      line-height: 19px;
    `,
  },
  xl: {
    regular: css`
      font-size: 18px;
      font-weight: ${FontWeight.regular};
      line-height: 21px;
    `,
    medium: css`
      font-size: 18px;
      font-weight: ${FontWeight.medium};
      line-height: 21px;
    `,
    bold: css`
      font-size: 18px;
      font-weight: ${FontWeight.bold};
      line-height: 21px;
    `,
  },
  '2xl': {
    regular: css`
      font-size: 20px;
      font-weight: ${FontWeight.regular};
      line-height: 24px;
    `,
    medium: css`
      font-size: 20px;
      font-weight: ${FontWeight.medium};
      line-height: 24px;
    `,
    bold: css`
      font-size: 20px;
      font-weight: ${FontWeight.bold};
      line-height: 24px;
    `,
  },
  '3xl': {
    regular: css`
      font-size: 24px;
      font-weight: ${FontWeight.regular};
      line-height: 29px;
    `,
    medium: css`
      font-size: 24px;
      font-weight: ${FontWeight.medium};
      line-height: 29px;
    `,
    bold: css`
      font-size: 24px;
      font-weight: ${FontWeight.bold};
      line-height: 29px;
    `,
  },
  '4xl': {
    regular: css`
      font-size: 28px;
      font-weight: ${FontWeight.regular};
      line-height: 33px;
    `,
    medium: css`
      font-size: 28px;
      font-weight: ${FontWeight.medium};
      line-height: 33px;
    `,
    bold: css`
      font-size: 28px;
      font-weight: ${FontWeight.bold};
      line-height: 33px;
    `,
  },
  '5xl': {
    regular: css`
      font-size: 36px;
      font-weight: ${FontWeight.regular};
      line-height: 43px;
    `,
    medium: css`
      font-size: 36px;
      font-weight: ${FontWeight.medium};
      line-height: 43px;
    `,
    bold: css`
      font-size: 36px;
      font-weight: ${FontWeight.bold};
      line-height: 43px;
    `,
  },
  '6xl': {
    regular: css`
      font-size: 64px;
      font-weight: ${FontWeight.regular};
      line-height: 76px;
    `,
    medium: css`
      font-size: 64px;
      font-weight: ${FontWeight.medium};
      line-height: 76px;
    `,
    bold: css`
      font-size: 64px;
      font-weight: ${FontWeight.bold};
      line-height: 76px;
    `,
  },
};
