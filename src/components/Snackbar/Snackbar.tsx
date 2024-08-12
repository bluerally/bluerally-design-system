import { palette } from '@/style/theme/palette';
import { FontWeight } from '@/style/theme/typography';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CircleX, Info, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';

const DURATION = 7000;
const ANIMATION_TIME = 300;

const VARIANTS = {
  info: {
    icon: <Info width={24} height={24} color={palette.gray['600']} />,
    style: {
      backgroundColor: palette.gray['50'],
      color: palette.gray['500'],
      borderColor: palette.gray['600'],
    },
  },
  error: {
    icon: <CircleX width={24} height={24} color={palette.error['300']} />,
    style: {
      backgroundColor: palette.error['50'],
      color: palette.error['300'],
      borderColor: palette.error['300'],
    },
  },
};

export type SnackbarType = 'info' | 'error';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  uniqueId: number;
  title: string;
  content?: string;
  variant: SnackbarType;
  isClose?: boolean;
  onExit?: (sequenceId: number) => void;
}

export const Snackbar = ({
  uniqueId,
  onExit,
  content,
  title,
  variant = 'info',
  isClose = false,
  style,
  ...rest
}: SnackbarProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleExit = useCallback(() => {
    ref.current?.animate(
      [
        {
          transform: 0,
          opacity: 1,
        },
        {
          transform: 'translateX(100%)',
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
    setTimeout(() => {
      handleExit();
    }, DURATION);
  }, [handleExit]);

  return (
    <SnackbarContainer
      style={{ ...VARIANTS[variant].style, ...style }}
      ref={ref}
      {...rest}
    >
      {VARIANTS[variant].icon}
      <TextContainer>
        {title && <TitleContainer>{title}</TitleContainer>}
        {content && <ContentContainer>{content}</ContentContainer>}
      </TextContainer>
      {isClose && (
        <IconContainer>
          <X
            onClick={handleExit}
            color={VARIANTS[variant].style.borderColor}
            width={24}
            height={24}
          />
        </IconContainer>
      )}
    </SnackbarContainer>
  );
};

const enter = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: 0;
    opacity: 1;
  }
`;

const SnackbarContainer = styled('div')`
  overflow: hidden;
  width: fit-content;
  display: flex;

  padding: ${({ theme }) => `${theme.spacing(7)} ${theme.spacing(12)}`};
  border: 1px solid;
  border-radius: 8px;

  animation: ${enter} ${ANIMATION_TIME}ms ease;
`;

const TextContainer = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(5)};
`;

const TitleContainer = styled('div')`
  font-size: 12px;
  font-weight: ${FontWeight.regular};
  line-height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ContentContainer = styled('div')`
  font-size: 12px;
  font-weight: ${FontWeight.regular};
  line-height: 24px;
`;

const IconContainer = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(5)};
`;
