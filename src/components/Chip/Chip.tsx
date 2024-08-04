import chipStyles from './style';
import { theme } from '@/style';
import styled from '@emotion/styled';
import React from 'react';

type ChipVariant = 'gray-filled' | 'primary-outline' | 'red-outline';

export interface ChipProps {
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
  variant = 'gray-filled',
  startIcon,
  endIcon,
  children,
  ...rest
}: ChipProps) => {
  return (
    <ChipContainer variant={variant} {...rest}>
      <ChipInner variant={variant}>
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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  height: 24px;
  border-radius: 30px;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: 0 ${({ theme }) => theme.spacing(3)};

  ${({ variant }) => variant && chipStyles.variants[variant]};
`;

const ChipInner = styled('div')<{
  variant: ChipVariant;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  ${({ theme }) => theme.typography['sm'].medium};
  line-height: 16px;
`;
