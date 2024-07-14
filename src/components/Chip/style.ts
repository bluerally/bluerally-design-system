import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export const chipIconColors = {
  sky: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export default {
  variants: {
    'gray-filled': css`
      background: ${theme.palette.gray['100']};
      border: 1px solid transparent;
      color: ${theme.palette.gray['500']};
    `,
    'primary-outline': css`
      border: 1px solid ${theme.palette.primary['100']};
      background-color: ${theme.palette.primary['50']};
      color: ${theme.palette.primary['200']};
    `,
    'red-outline': css`
      border: 1px solid ${theme.palette.error['100']};
      background-color: ${theme.palette.error['50']};
      color: ${theme.palette.error['200']};
    `,
  },
};
