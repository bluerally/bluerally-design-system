import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export default {
  variants: {
    'primary-outline': css`
      background-color: transparent;
      color: ${theme.palette.primary['300']};
      outline: 1px solid ${theme.palette.primary['100']};
    `,
    'gray-outline': css`
      background-color: transparent;
      color: ${theme.palette.gray['600']};
      outline: 1px solid ${theme.palette.gray['200']};
    `,
    'gray-filled': css`
      background: ${theme.palette.gray['100']};
      color: ${theme.palette.gray['500']};
    `,
  },
};
