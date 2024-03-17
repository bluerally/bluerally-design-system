import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export default {
  colors: {
    sky: css`
      --main-color: ${theme.palette.sky['500']};
      --text-color: ${theme.palette.white};
      --disabled-color: ${theme.palette.newGray['150']};
      --disabled-text-color: ${theme.palette.newGray['400']};
      --filled-hover-color: ${theme.palette.sky['700']};
      --outlined-background-color: ${theme.palette.sky['50']};
      --outlined-border-color: ${theme.palette.sky['500']};
      --outlined-text-color: ${theme.palette.sky['500']};
      --outlined-background-color: ${theme.palette.sky['50']};
      --outlined-hover-background-color: ${theme.palette.sky['150']};
      --outlined-hover-border-color: ${theme.palette.sky['500']};
      --outlined-disabled-border-color: ${theme.palette.newGray['200']};
    `,
    gray: css`
      --main-color: ${theme.palette.newGray['150']};
      --text-color: ${theme.palette.newGray['500']};
      --disabled-color: ${theme.palette.newGray['150']};
      --disabled-text-color: ${theme.palette.newGray['400']};
      --filled-hover-color: ${theme.palette.newGray['200']};
      --outlined-background-color: ${theme.palette.white};
      --outlined-border-color: ${theme.palette.newGray['300']};
      --outlined-text-color: ${theme.palette.newGray['400']};
      --outlined-hover-background-color: ${theme.palette.newGray['150']};
      --outlined-hover-border-color: ${theme.palette.newGray['200']};
      --outlined-disabled-border-color: ${theme.palette.newGray['200']};
    `,
    error: css`
      --main-color: ${theme.palette.newError['600']};
      --text-color: ${theme.palette.white};
      --disabled-color: ${theme.palette.newGray['150']};
      --disabled-text-color: ${theme.palette.newGray['400']};
      --filled-hover-color: ${theme.palette.newError['700']};
      --outlined-background-color: ${theme.palette.newError['50']};
      --outlined-border-color: ${theme.palette.newError['600']};
      --outlined-text-color: ${theme.palette.newError['600']};
      --outlined-hover-background-color: ${theme.palette.newError['200']};
      --outlined-hover-border-color: ${theme.palette.newError['600']};
      --outlined-disabled-border-color: ${theme.palette.newGray['200']};
    `,
  },
  variants: {
    filled: css`
      background: var(--main-color);
      border: 1px solid transparent;
      color: var(--text-color);

      &:hover {
        background: var(--filled-hover-color);
      }

      &:disabled {
        background-color: var(--disabled-color);
        color: var(--disabled-text-color);
      }
    `,
    outlined: css`
      border: 1px solid var(--outlined-border-color);
      background-color: var(--outlined-background-color);
      color: var(--outlined-text-color);

      &:hover {
        background-color: var(--outlined-hover-background-color);
        color: var(--outlined-text-color);
        border: 1px solid var(--outlined-hover-border-color);
      }

      &:disabled {
        border: 1px solid var(--outlined-disabled-border-color);
        color: var(--disabled-text-color);
        background-color: var(--disabled-color);
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
  },
  sizes: {
    xs: css`
      ${theme.typography['sm-2'].semiBold}
      padding: ${theme.spacing(2.5)} ${theme.spacing(6)};
      height: 27px;
    `,
    sm: css`
      ${theme.typography['sm-2'].semiBold}
      padding: ${theme.spacing(4)} ${theme.spacing(6)};
      height: 33px;
    `,
    md: css`
      ${theme.typography.md.semiBold}
      padding: ${theme.spacing(4)} ${theme.spacing(6)};
      height: 37px;
    `,
    lg: css`
      ${theme.typography.lg.semiBold}
      padding: ${theme.spacing(5)} ${theme.spacing(7)};
      height: 44px;
    `,
  },
};
