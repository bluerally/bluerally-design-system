import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export const chipIconColors = {
  primary: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export default {
  colors: {
    primary: css`
      --main-color: ${theme.palette.sky['500']};
      --main-text-color: ${theme.palette.white};
      --disabled-color: ${theme.palette.newGray['200']};
      --filled-hover-color: ${theme.palette.sky['600']};
      --lightFilled-background-color: ${theme.palette.sky['50']};
      --lightFilled-border-color: ${theme.palette.sky['150']};
      --lightFilled-text-color: ${theme.palette.sky['500']};
      --lightFilled-disabled-color: ${theme.palette.newGray['50']};
      --lightFilled-disabled-border-color: ${theme.palette.gray['200']};
    `,
    gray: css`
      --main-color: ${theme.palette.newGray['100']};
      --main-text-color: ${theme.palette.newGray['600']};
      --disabled-color: ${theme.palette.gray['300']};
      --filled-hover-color: ${theme.palette.newGray['300']};
      --lightFilled-background-color: ${theme.palette.primary['100']};
      --lightFilled-border-color: ${theme.palette.primary['200']};
      --lightFilled-text-color: ${theme.palette.primary['300']};
      --lightFilled-disabled-color: ${theme.palette.gray['50']};
      --lightFilled-disabled-border-color: ${theme.palette.gray['200']};
    `,
  },
  variants: {
    filled: css`
      background: var(--main-color);
      border: 1px solid transparent;
      color: var(--main-text-color);

      &:hover {
        background: var(--filled-hover-color);
      }

      &:disabled {
        background-color: var(--disabled-color);
      }
    `,
    outlined: css`
      border: 1px solid var(--lightFilled-border-color);
      background-color: var(--lightFilled-background-color);
      color: var(--lightFilled-text-color);

      &:hover {
        background-color: var(--lightFilled-border-color);
        color: var(--lightFilled-text-color);
      }

      &:disabled {
        border: 1px solid var(--lightFilled-disabled-border-color);
        color: var(--lightFilled-disabled-color);
      }
    `,
  },
};
