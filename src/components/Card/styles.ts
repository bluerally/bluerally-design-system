import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export default {
  colors: {
    primary: css`
      --main-color: ${theme.palette.primary.main};
    `,
    warning: css`
      --main-color: ${theme.palette.warning.main};
    `,
    error: css`
      --main-color: ${theme.palette.error.main};
    `,
    success: css`
      --main-color: ${theme.palette.success.main};
    `,
    gray: css`
      --main-color: ${theme.palette.gray['200']};
    `,
  },
  variants: {
    default: css`
      border: 1px solid var(--main-color);
    `,
    leftBorder: css`
      border-width: ${theme.spacing(0.5)} ${theme.spacing(0.5)}
        ${theme.spacing(0.5)} ${theme.spacing(3)};
      border-style: solid;
      border-color: var(--main-color);
    `,
    noBorder: css`
      border: none;
    `,
  },
};
