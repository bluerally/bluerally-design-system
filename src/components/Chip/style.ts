import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export const chipIconColors = {
  sky: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export default {
  colors: {
    sky: css`
      --main-color: ${theme.palette.sky['500']};
      --main-text-color: ${theme.palette.white};
      --outlined-background-color: ${theme.palette.sky['50']};
      --outlined-border-color: ${theme.palette.sky['200']};
      --outlined-text-color: ${theme.palette.sky['500']};
    `,
    gray: css`
      --main-color: ${theme.palette.newGray['100']};
      --main-text-color: ${theme.palette.newGray['500']};
    `,
  },
  variants: {
    filled: css`
      background: var(--main-color);
      border: 1px solid transparent;
      color: var(--main-text-color);
    `,

    outlined: css`
      border: 1px solid var(--outlined-border-color);
      background-color: var(--outlined-background-color);
      color: var(--outlined-text-color);
    `,
  },
};
