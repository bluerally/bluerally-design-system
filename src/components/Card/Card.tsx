import cardStyles from './styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export type CardVariants = 'default' | 'leftBorder' | 'noBorder';

interface CardProps {
  variant?: CardVariants;
  color?: 'primary' | 'error' | 'gray';
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card = ({
  variant = 'default',
  color = 'gray',
  children,
  ...rest
}: CardProps) => {
  return (
    <CardContainer variant={variant} color={color} {...rest}>
      {children}
    </CardContainer>
  );
};

const CardContainer = styled('div')<CardProps>`
  width: max-content;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.palette.gray['100']};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  ${({ color }) => color && cardStyles.colors[color]};
  ${({ variant }) => variant && cardStyles.variants[variant]};
`;
