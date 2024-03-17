import styled from '@emotion/styled';
import { Calendar } from 'lucide-react';
import React from 'react';
import { forwardRef } from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  onClick?: (e: any) => void;
}

export const CalendarIcon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  { color = '#000', size = 20, onClick, ...rest }: IconProps,
  ref,
) {
  return (
    <CalendarWrapper onClick={onClick} ref={ref} {...rest}>
      <Calendar size={size} color={color} />
    </CalendarWrapper>
  );
});

const CalendarWrapper = styled('div')`
  display: flex;
  justify-content: center;

  ${({ onClick }) => onClick && `cursor: pointer`};
`;
