import { Size } from '../../@types/style';
import buttonStyles from './style';
import styled from '@emotion/styled';
import React from 'react';

export type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = 'sky' | 'gray' | 'error';
type ButtonSize = 'xs' | Size;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  width?: string;
}

export const Button = ({
  variant = 'filled',
  color = 'sky',
  size = 'md',
  children,
  disabled,
  onClick,
  startIcon,
  endIcon,
  type,
  width,
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
      width={width}
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
  border-radius: 6px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  gap: ${({ theme }) => theme.spacing(2)};

  &:disabled {
    pointer-events: none;
  }

  ${({ width }) => `width: ${width}`};
  ${({ color }) => color && buttonStyles.colors[color]};
  ${({ variant }) => variant && buttonStyles.variants[variant]};
  ${({ size }) => size && buttonStyles.sizes[size]};
`;
