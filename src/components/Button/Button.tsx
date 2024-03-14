import styled from '@emotion/styled';
import React from 'react';

import { Size } from '@/@types';

import buttonStyles from './style';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'lightFilled';
type ButtonColor = 'primary' | 'warning' | 'error' | 'success';
type ButtonSize = 'xs' | Size;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  children,
  disabled,
  onClick,
  startIcon,
  endIcon,
  type,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonContainer
      {...rest}
      type={type ?? 'submit'}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonContainer>
  );
};

const ButtonContainer = styled('button')<ButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  gap: ${({ theme }) => theme.spacing(2)};

  &:disabled {
    pointer-events: none;
  }

  ${({ color }) => color && buttonStyles.colors[color]};
  ${({ variant }) => variant && buttonStyles.variants[variant]};
  ${({ size }) => size && buttonStyles.sizes[size]};
`;
