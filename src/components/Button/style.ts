import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export default {
  colors: {
    primary: css`
      --main-color: ${theme.palette.sky['500']};
      --disabled-color: ${theme.palette.newGray['150']};
      --filled-hover-color: ${theme.palette.sky['500']};
      --lightFilled-background-color: ${theme.palette.sky['50']};
      --lightFilled-border-color: ${theme.palette.sky['500']};
      --lightFilled-text-color: ${theme.palette.sky['500']};
      --lightFilled-disabled-color: ${theme.palette.white};
      --lightFilled-disabled-border-color: ${theme.palette.newGray['150']};
      --text-main-color: ${theme.palette.sky['500']};
    `,
    warning: css`
      --main-color: ${theme.palette.primary.main};
      --disabled-color: ${theme.palette.gray['300']};
      --filled-hover-color: ${theme.palette.primary['500']};
      --lightFilled-background-color: ${theme.palette.primary['100']};
      --lightFilled-border-color: ${theme.palette.primary['200']};
      --lightFilled-text-color: ${theme.palette.primary['300']};
      --lightFilled-disabled-color: ${theme.palette.gray['50']};
      --lightFilled-disabled-border-color: ${theme.palette.gray['200']};
      --text-main-color: ${theme.palette.warning.main};
    `,
    error: css`
      --main-color: ${theme.palette.primary.main};
      --disabled-color: ${theme.palette.gray['300']};
      --filled-hover-color: ${theme.palette.primary['500']};
      --lightFilled-background-color: ${theme.palette.primary['100']};
      --lightFilled-border-color: ${theme.palette.primary['200']};
      --lightFilled-text-color: ${theme.palette.primary['300']};
      --lightFilled-disabled-color: ${theme.palette.gray['50']};
      --lightFilled-disabled-border-color: ${theme.palette.gray['200']};
      --text-main-color: ${theme.palette.error.main};
    `,
    success: css`
      --main-color: ${theme.palette.primary.main};
      --disabled-color: ${theme.palette.gray['300']};
      --filled-hover-color: ${theme.palette.primary['500']};
      --lightFilled-background-color: ${theme.palette.primary['100']};
      --lightFilled-border-color: ${theme.palette.primary['200']};
      --lightFilled-text-color: ${theme.palette.primary['300']};
      --lightFilled-disabled-color: ${theme.palette.gray['50']};
      --lightFilled-disabled-border-color: ${theme.palette.gray['200']};
      --text-main-color: ${theme.palette.success.main};
    `,
  },
  variants: {
    filled: css`
      background: var(--main-color);
      border: 1px solid transparent;
      color: ${theme.palette.white};

      &:hover {
        background: var(--filled-hover-color);
      }

      &:disabled {
        background-color: var(--disabled-color);
      }
    `,
    outlined: css`
      border: 1px solid var(--main-color);
      background-color: ${theme.palette.white};
      color: var(--main-color);

      &:hover {
        background-color: var(--main-color);
        color: ${theme.palette.white};
      }

      &:disabled {
        border: 1px solid var(--disabled-color);
        color: var(--disabled-color);
      }
    `,
    text: css`
      background-color: transparent;
      border: 1px solid transparent;
      color: var(--text-main-color);

      &:disabled {
        color: ${theme.palette.newGray['400']};
      }
    `,
    lightFilled: css`
      border: 1px solid var(--lightFilled-border-color);
      background-color: var(--lightFilled-background-color);
      color: var(--lightFilled-text-color);

      &:hover {
        border: 1px solid var(--main-color);
        color: var(--main-color);
      }

      &:disabled {
        background-color: var(--lightFilled-disabled-color);
        border: 1px solid var(--lightFilled-disabled-border-color);
        color: var(--disabled-color);
      }
    `,
  },
  sizes: {
    xs: css`
      ${theme.typography['sm-2'].semiBold}
      padding: ${theme.spacing(2)} ${theme.spacing(7)};
      height: 27px;
    `,
    sm: css`
      ${theme.typography['sm-2'].semiBold}
      padding: ${theme.spacing(3)} ${theme.spacing(10)};
      height: 33px;
    `,
    md: css`
      ${theme.typography.md.semiBold}
      padding: ${theme.spacing(5)} ${theme.spacing(10)};
      height: 37px;
    `,
    lg: css`
      ${theme.typography.lg.semiBold}
      padding: ${theme.spacing(7)} ${theme.spacing(12)};
      height: 44px;
    `,
  },
};
