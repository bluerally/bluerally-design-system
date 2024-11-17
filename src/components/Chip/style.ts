import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export const chipIconColors = {
  sky: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export default {
  variants: {
    'primary-filled': css`
      background-color: ${theme.palette.primary['300']};
      color: ${theme.palette.white};
    `,
    'primary-outline': css`
      background-color: ${theme.palette.primary['20']};
      color: ${theme.palette.primary['300']};
      outline: 1px solid ${theme.palette.primary['200']};
    `,
    'primary-light-filled': css`
      background-color: ${theme.palette.primary['20']};
      color: ${theme.palette.primary['300']};
    `,
    'gray-filled': css`
      background: ${theme.palette.gray['100']};
      color: ${theme.palette.gray['500']};
    `,
    'gray-outline': css`
      background-color: ${theme.palette.white};
      color: ${theme.palette.gray['400']};
      outline: 1px solid ${theme.palette.gray['200']};
    `,
    'red-outline': css`
      background-color: ${theme.palette.error['50']};
      color: ${theme.palette.error['300']};
    `,
  },
  size: {
    sm: css`
      padding: 2px 8px;
      height: 22px;
    `,
    lg: css`
      padding: 8px 14px;
      height: 36px;
    `,
  },
};
