import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Colors } from '@/@types';

import { Icon } from '../Icon';
import { chipIconColors, chipStyles } from './style';

type ChipVariant = 'outlined' | 'filled';
type Size = 'sm' | 'md';
export type ChipColors =
  | Colors
  | 'orange'
  | 'lightgray'
  | 'purple'
  | 'darkPrimary';

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
  height: ${({ size }) => (size === 'md' ? '28px' : '24px')};
  border-radius: 14px;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: 0 ${({ theme }) => theme.spacing(5)};

  ${({ variant, color, disabled, theme }) => {
    const chipColor = disabled ? 'gray' : color;

    if (variant === 'outlined') {
      return css`
        background-color: ${theme.palette.white};
        ${chipStyles[chipColor].border};
      `;
    }

    return css`
      ${chipStyles[chipColor].background};
    `;
  }}

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

  ${({ theme }) => theme.typography.sm.medium};
  line-height: 16px;

  ${({ variant, color, disabled }) => {
    const chipColor = disabled ? 'gray' : color;

    return variant === 'outlined'
      ? chipStyles[chipColor].outlinedFontColor
      : chipStyles[chipColor].fontColor;
  }}
`;
