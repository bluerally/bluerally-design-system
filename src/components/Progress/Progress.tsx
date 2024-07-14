import progressStyles, { circularRotateKeyframe } from './style';
import { Size } from '@/@types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface ProgressProps {
  size?: Size | number;
  thickness?: number;
}

export const Progress = ({
  size = 'md',
  thickness,
  ...rest
}: ProgressProps) => {
  return <ProgressContainer size={size} thickness={thickness} {...rest} />;
};

const ProgressContainer = styled('div')<ProgressProps>`
  display: inline-block;
  background-image: linear-gradient(
      ${({ theme }) => theme.palette.white},
      ${({ theme }) => theme.palette.white}
    ),
    linear-gradient(
      to right,
      ${({ theme }) => theme.palette.primary['300']},
      ${({ theme }) => theme.palette.white}
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: ${circularRotateKeyframe} 1.4s linear infinite;
  border-radius: 50%;

  ${({ thickness }) =>
    thickness &&
    css`
      border: ${thickness}px solid transparent;
    `}

  ${({ size }) => {
    if (!size) {
      return;
    }

    switch (typeof size) {
      case 'string': {
        return css`
          ${progressStyles.sizes[size]}
          ${progressStyles.borderSizes[size]}
        `;
      }

      case 'number': {
        return css`
          width: ${size}px;
          height: ${size}px;
        `;
      }
    }
  }}
`;
