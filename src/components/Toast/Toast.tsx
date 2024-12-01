import { palette } from '@/style/theme/palette';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CheckCircle2, Info } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';

const DURATION = 3000;
const ANIMATION_TIME = 200;

export type ToastType = 'success' | 'warning';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  uniqueId: number;
  content?: string;
  variant: ToastType;
  isClose?: boolean;
  onExit?: (sequenceId: number) => void;
  marginX?: string;
  marginY?: string;
  minWidth?: string;
  maxWidth?: string;
}

export const Toast = ({
  uniqueId,
  onExit,
  content,
  variant = 'success',
  minWidth = '350px',
  maxWidth = '600px',
  marginX = '16px',
  marginY = '20px',
  ...rest
}: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleExit = useCallback(() => {
    ref.current?.animate(
      [
        {
          transform: 'translate(-50%, 0)',
          opacity: 1,
        },
        {
          transform: 'translate(-50%, 100%)',
          opacity: 0,
        },
      ],
      {
        duration: ANIMATION_TIME,
        fill: 'forwards',
      },
    );
    setTimeout(() => {
      onExit?.(uniqueId);
    }, ANIMATION_TIME + 100);
  }, [onExit, uniqueId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleExit();
    }, DURATION);
    return () => clearTimeout(timer);
  }, [handleExit]);

  return (
    <ToastContainer
      ref={ref}
      minWidth={minWidth}
      maxWidth={maxWidth}
      marginX={marginX}
      marginY={marginY}
      {...rest}
    >
      {variant === 'success' ? (
        <CheckCircle2
          width={16}
          height={16}
          fill={palette.success}
          color={palette.gray['600']}
        />
      ) : (
        <Info
          width={16}
          height={16}
          fill={palette.warning}
          color={palette.gray['600']}
        />
      )}
      <ContentContainer>{content}</ContentContainer>
    </ToastContainer>
  );
};

const enter = keyframes`
  from {
    transform: translate(-50%, 100%); 
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0); 
    opacity: 1;
  }
`;

const ToastContainer = styled('div')<{
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  marginX?: string;
  marginY?: string;
}>`
  position: fixed;
  bottom: ${({ marginY }) => marginY};
  left: 50%;
  transform: translateX(-50%);

  width: calc(100% - ${({ marginX }) => marginX && `calc(${marginX} * 2)`});

  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};

  overflow: hidden;
  display: flex;
  align-items: center;

  padding: 12px 14px;

  border-radius: 14px;
  background-color: ${({ theme }) => theme.palette.gray['600']};
  box-shadow: 0px 0px 8px 0px rgba(80, 84, 90, 0.08);
  box-shadow: 0px 8px 16px 0px rgba(80, 84, 90, 0.08);
  box-shadow: 0px 16px 20px 0px rgba(80, 84, 90, 0.12);

  animation: ${enter} ${ANIMATION_TIME}ms ease;
`;

const ContentContainer = styled('div')`
  color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => theme.typography.md.medium};
  margin-left: 6px;
`;
