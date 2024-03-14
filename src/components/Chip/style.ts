import { SerializedStyles, css } from '@emotion/react';

import { theme } from '@/style/theme';

import { ChipColors } from './Chip';

type ChipStyle = 'background' | 'border' | 'fontColor' | 'outlinedFontColor';
type ChipStyleType = {
  [variant in ChipColors]: Record<ChipStyle, SerializedStyles>;
};

export const chipIconColors = {
  primary: theme.palette.primary.main,
  gray: theme.palette.gray['600'],
  error: theme.palette.error['600'],
  warning: theme.palette.warning['600'],
  success: theme.palette.success['600'],
  orange: '#FF7F00',
  lightgray: theme.palette.gray['600'],
  purple: '#4E3276',
  darkPrimary: theme.palette.white,
};

export const chipStyles: ChipStyleType = {
  primary: {
    background: css`
      background-color: ${theme.palette.primary['100']};
    `,
    border: css`
      border: 1px solid ${theme.palette.primary.main};
    `,
    fontColor: css`
      color: ${theme.palette.primary.main};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.primary.main};
    `,
  },
  gray: {
    background: css`
      background-color: ${theme.palette.gray['100']};
    `,
    border: css`
      border: 1px solid ${theme.palette.gray.main};
    `,
    fontColor: css`
      color: ${theme.palette.gray[600]};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.gray.main};
    `,
  },
  error: {
    background: css`
      background-color: ${theme.palette.error['50']};
    `,
    border: css`
      border: 1px solid ${theme.palette.error.main};
    `,
    fontColor: css`
      color: ${theme.palette.error.main};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.error.main};
    `,
  },
  success: {
    background: css`
      background-color: ${theme.palette.success['50']};
    `,
    border: css`
      border: 1px solid ${theme.palette.success.main};
    `,
    fontColor: css`
      color: ${theme.palette.success[600]};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.success.main};
    `,
  },
  warning: {
    background: css`
      background-color: ${theme.palette.warning['50']};
    `,
    border: css`
      border: 1px solid ${theme.palette.warning.main};
    `,
    fontColor: css`
      color: ${theme.palette.warning[600]};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.warning.main};
    `,
  },
  orange: {
    background: css`
      background-color: #fff3e0;
    `,
    border: css`
      border: 1px solid #ff7f00;
    `,
    fontColor: css`
      color: #ff7f00;
    `,
    outlinedFontColor: css`
      color: #ff7f00;
    `,
  },
  lightgray: {
    background: css`
      background-color: ${theme.palette.gray[50]};
    `,
    border: css`
      border: 1px solid ${theme.palette.gray[200]};
    `,
    fontColor: css`
      color: ${theme.palette.gray[500]};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.gray[300]};
    `,
  },
  purple: {
    background: css`
      background-color: #e6e1ef;
    `,
    border: css`
      border: 1px solid #4e3276;
    `,
    fontColor: css`
      color: #4e3276;
    `,
    outlinedFontColor: css`
      color: #4e3276;
    `,
  },
  darkPrimary: {
    background: css`
      background-color: ${theme.palette.primary.main};
    `,
    border: css`
      border: 1px solid ${theme.palette.primary.main};
    `,
    fontColor: css`
      color: ${theme.palette.white};
    `,
    outlinedFontColor: css`
      color: ${theme.palette.primary.main};
    `,
  },
};
