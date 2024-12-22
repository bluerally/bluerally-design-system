import { Size } from '../../@types/style';
import buttonStyles from './style';
import styled from '@emotion/styled';
import React from 'react';

export type ButtonVariant =
  | 'primary-filled'
  | 'primary-outline'
  | 'red-outline'
  | 'gray-outline'
  | 'gray-filled';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  width?: string;
}

export const Button = ({
  variant = 'primary-filled',
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
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  gap: ${({ theme }) => theme.spacing(2)};

  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.palette.gray['200']};
    color: ${({ theme }) => theme.palette.gray['400']};
  }

  ${({ width }) => `width: ${width}`};
  ${({ variant }) => variant && buttonStyles.variants[variant]};
  ${({ size }) => size && buttonStyles.sizes[size]};
`;
