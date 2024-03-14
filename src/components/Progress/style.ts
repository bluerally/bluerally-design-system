import { css, keyframes } from '@emotion/react';

export const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export default {
  sizes: {
    sm: css`
      width: 13px;
      height: 13px;
    `,
    md: css`
      width: 26px;
      height: 26px;
    `,
    lg: css`
      width: 45.5px;
      height: 45.5px;
    `,
  },
  borderSizes: {
    sm: css`
      border: 3px solid transparent;
    `,
    md: css`
      border: 6px solid transparent;
    `,
    lg: css`
      border: 7px solid transparent;
    `,
  },
};
