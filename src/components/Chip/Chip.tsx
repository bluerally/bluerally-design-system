import chipStyles from './style';
import { Size } from '@/@types';
import { theme } from '@/style';
import styled from '@emotion/styled';
import React from 'react';

type ChipVariant =
  | 'primary-filled'
  | 'primary-light-filled'
  | 'primary-outline'
  | 'gray-filled'
  | 'gray-outline'
  | 'red-outline';

type ChipSize = Exclude<Size, 'md'>;

export interface ChipProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: ChipSize;
}

export const chipIconColors = {
  sky: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export const Chip = ({
  variant = 'gray-filled',
  startIcon,
  endIcon,
  children,
  size = 'lg',
  ...rest
}: ChipProps) => {
  return (
    <ChipContainer variant={variant} size={size} {...rest}>
      <ChipInner variant={variant} size={size}>
        {startIcon}
        {children}
        {endIcon}
      </ChipInner>
    </ChipContainer>
  );
};

const ChipContainer = styled('div')<{
  variant: ChipVariant;
  disabled?: boolean;
  size?: ChipSize;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 100px;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ variant }) => variant && chipStyles.variants[variant]};
  ${({ size }) => size && chipStyles.size[size]};
`;

const ChipInner = styled('div')<{
  variant: ChipVariant;
  disabled?: boolean;
  size?: ChipSize;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  line-height: 16px;
  ${({ size, theme }) =>
    size === 'sm'
      ? theme.typography.basic.medium
      : theme.typography['basic-2'].medium};
`;
