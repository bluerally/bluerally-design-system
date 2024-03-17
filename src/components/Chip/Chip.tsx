import { Icon } from '../Icon';
import chipStyles from './style';
import { theme } from '@/style';
import styled from '@emotion/styled';
import React from 'react';

type ChipVariant = 'outlined' | 'filled';
export type ChipColors = 'sky' | 'gray';

export interface ChipProps {
  color?: ChipColors;
  variant?: ChipVariant;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const chipIconColors = {
  sky: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export const Chip = ({
  color = 'sky',
  variant = 'filled',
  startIcon,
  endIcon,
  children,
  ...rest
}: ChipProps) => {
  return (
    <ChipContainer variant={variant} color={color} {...rest}>
      <ChipInner variant={variant} color={color}>
        {startIcon}
        {children}
        {endIcon}
      </ChipInner>
    </ChipContainer>
  );
};

const ChipContainer = styled('div')<{
  variant: ChipVariant;
  color: ChipColors;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  height: 24px;
  border-radius: 4px;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: 0 ${({ theme }) => theme.spacing(5)};

  ${({ color }) => color && chipStyles.colors[color]};
  ${({ variant }) => variant && chipStyles.variants[variant]};
`;

const ChipInner = styled('div')<{
  variant: ChipVariant;
  color: ChipColors;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  ${({ theme }) => theme.typography['sm-2'].medium};
  line-height: 16px;
`;
