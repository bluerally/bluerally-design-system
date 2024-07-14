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
    `,
    'primary-outline': css`
      border: 1px solid ${theme.palette.primary['150']};
      background-color: ${theme.palette.primary['50']};
      color: ${theme.palette.primary['300']};

      &:hover {
        background-color: ${theme.palette.primary['100']};
      }
    `,
    'red-outline': css`
      border: 1px solid ${theme.palette.error['150']};
      background-color: ${theme.palette.error['50']};
      color: ${theme.palette.error['300']};

      &:hover {
        background-color: ${theme.palette.error['100']};
      }
    `,
    'gray-outline': css`
      border: 1px solid ${theme.palette.gray['300']};
      background-color: ${theme.palette.white};
      color: ${theme.palette.gray['600']};

      &:hover {
        background-color: ${theme.palette.gray['50']};
      }
    `,
  },
  sizes: {
    sm: css`
      ${theme.typography.basic.medium}
      padding: 6px 14px;
      height: 30px;
    `,
    md: css`
      ${theme.typography['basic-2'].medium}
      padding: 8px 18px;
      height: 36px;
    `,
    lg: css`
      ${theme.typography.md.medium}
      padding: 14px 40px;
      height: 49px;
    `,
  },
};
