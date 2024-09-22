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
      color: ${theme.palette.gray['600']};
    `,
    'primary-outline': css`
      background-color: ${theme.palette.primary['20']};
      color: ${theme.palette.primary['300']};
    `,
    'red-outline': css`
      background-color: ${theme.palette.error['50']};
      color: ${theme.palette.error['300']};
    `,
  },
};
