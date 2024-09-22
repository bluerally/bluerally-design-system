import { theme } from '@/style/theme';
import { css } from '@emotion/react';

export default {
  variants: {
    'primary-filled': css`
      background: ${theme.palette.primary['300']};
      border: 1px solid transparent;
      color: ${theme.palette.white};

      &:hover {
        background: ${theme.palette.primary['400']};
      }

      &:active {
        background: ${theme.palette.primary['400']};
      }
    `,
    'primary-outline': css`
      border: 1px solid ${theme.palette.primary['100']};
      background: ${theme.palette.primary['20']};
      color: ${theme.palette.primary['300']};

      &:hover {
        background: ${theme.palette.primary['50']};
      }

      &:active {
        background: ${theme.palette.primary['100']};
      }
    `,
    'red-outline': css`
      border: 1px solid ${theme.palette.error['150']};
      background: ${theme.palette.error['50']};
      color: ${theme.palette.error['300']};

      &:hover {
        background: ${theme.palette.error['100']};
      }

      &:active {
        background: ${theme.palette.error['150']};
      }
    `,
    'gray-outline': css`
      border: 1px solid ${theme.palette.gray['200']};
      background: ${theme.palette.white};
      color: ${theme.palette.gray['600']};

      &:hover {
        background: ${theme.palette.gray['100']};
      }

      &:active {
        background: ${theme.palette.gray['300']};
      }
    `,
  },
  sizes: {
    sm: css`
      ${theme.typography['basic-2'].semiBold}
      border-radius: 10px;
      padding: 5px 12px;
      height: 30px;
      min-width: 69px;
    `,
    md: css`
      ${theme.typography.md.semiBold}
      border-radius: 12px;
      padding: 10px 18px;
      height: 41px;
      min-width: 85px;
    `,
    lg: css`
      ${theme.typography.lg.semiBold}
      border-radius: 14px;
      padding: 13px, 40px;
      height: 50px;
      min-width: 136px;
    `,
  },
};
