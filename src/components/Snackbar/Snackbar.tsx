import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef } from 'react';

import { palette } from '@/style/theme/palette';
import { FontWeight } from '@/style/theme/typography';

import { Icon } from '../Icon';

const DURATION = 7000;
const ANIMATION_TIME = 300;

const VARIANTS = {
  info: {
    icon: {
      type: 'info',
      color: palette.gray.main,
    },
    style: {
      backgroundColor: palette.gray['50'],
      color: palette.gray['500'],
      borderColor: palette.gray.main,
    },
  },
  success: {
    icon: {
      type: 'check-circle',
      color: palette.success.main,
    },
    style: {
      backgroundColor: palette.success['50'],
      color: palette.success['600'],
      borderColor: palette.success.main,
    },
  },
  warning: {
    icon: {
      type: 'alert-triangle',
      color: palette.warning.main,
    },
    style: {
      backgroundColor: palette.warning['50'],
      color: palette.warning['600'],
      borderColor: palette.warning.main,
    },
  },
  error: {
    icon: {
      type: 'x-circle',
      color: palette.error.main,
    },
    style: {
      backgroundColor: palette.error['50'],
      color: palette.error['600'],
      borderColor: palette.error.main,
    },
  },
};

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

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
      <Icon
        size={24}
        width={24}
        height={24}
        icon={VARIANTS[variant].icon.type}
        color={VARIANTS[variant].icon.color}
      />
      <TextContainer>
        {title && <TitleContainer>{title}</TitleContainer>}
        {content && <ContentContainer>{content}</ContentContainer>}
      </TextContainer>
      {isClose && (
        <IconContainer>
          <Icon
            onClick={handleExit}
            color={VARIANTS[variant].style.borderColor}
            size={24}
            width={24}
            height={24}
            icon="x"
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
