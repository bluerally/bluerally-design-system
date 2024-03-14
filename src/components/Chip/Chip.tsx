import { Icon } from '../Icon';
import buttonStyles from './style';
import { Colors } from '@/@types';
import { theme } from '@/style';
import styled from '@emotion/styled';
import React from 'react';

type ChipVariant = 'outlined' | 'filled';
type Size = 'sm' | 'md';
export type ChipColors = Extract<Colors, 'primary' | 'gray'>;

export interface ChipProps {
  size?: Size;
  color?: ChipColors;
  variant?: ChipVariant;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClickCancel?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const chipIconColors = {
  primary: theme.palette.white,
  gray: theme.palette.gray['600'],
};

export const Chip = ({
  size = 'sm',
  color = 'primary',
  variant = 'filled',
  startIcon,
  disabled,
  onClickCancel,
  onClick,
  children,
  ...rest
}: ChipProps) => {
  return (
    <ChipContainer
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {startIcon}
      <ChipInner variant={variant} color={color} disabled={disabled}>
        {children}
      </ChipInner>
      {onClickCancel && (
        <Icon icon="x" color={chipIconColors[color]} onClick={onClickCancel} />
      )}
    </ChipContainer>
  );
};

const ChipContainer = styled('div')<{
  variant: ChipVariant;
  color: ChipColors;
  size: Size;
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

  ${({ color }) => color && buttonStyles.colors[color]};
  ${({ variant }) => variant && buttonStyles.variants[variant]};

  cursor: ${({ disabled, onClick }) => {
    if (disabled) {
      return 'not-allowed';
    }

    if (onClick) {
      return 'pointer';
    }

    return 'default';
  }};
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
