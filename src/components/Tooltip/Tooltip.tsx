import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getAnchoredPosition } from '@/utils/getPosition';

import { Portal } from '../Portal';

export type TooltipColor = 'primary' | 'gray';
export type TooltipDirection = 'left' | 'right' | 'top' | 'bottom';

export interface TooltipProps {
  content: string;
  direction?: TooltipDirection;
  color?: TooltipColor;
  children: React.ReactNode;
  scrollable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
}

export const Tooltip = ({
  children,
  content,
  color = 'primary',
  direction = 'top',
  scrollable = true,
  clickable = false,
  disabled,
}: TooltipProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const closeTimeoutRef = useRef<number>();

  const openTooltip = useCallback(() => {
    if (disabled || clickable) {
      return;
    }

    clearTimeout(closeTimeoutRef.current);

    setIsHover(true);
  }, [clickable, disabled]);

  const closeTooltip = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsHover(false);
    }, 30);
  }, [setIsHover]);

  const tooltipEvents = useMemo(() => {
    if (!disabled && clickable) {
      return {
        onClick: () => setIsClick(!isClick),
      };
    }

    return {
      onMouseEnter: () => openTooltip(),
      onMouseLeave: () => closeTooltip(),
    };
  }, [disabled, clickable, isClick, openTooltip, closeTooltip]);

  useLayoutEffect(() => {
    if (!anchorRef.current || !contentRef.current) {
      return;
    }

    const contentRect = contentRef.current;
    const anchorRect = anchorRef.current;

    const { top, left } = getAnchoredPosition({
      floatingElement: contentRect,
      anchorElement: anchorRect,
      side: direction,
      align: 'center',
      isAttachRoot: !scrollable,
      gap: 14,
    });

    contentRef.current.style.left = `${left}px`;
    contentRef.current.style.top = `${top}px`;
  }, [direction, isHover, isClick, scrollable]);

  useEffect(() => {
    if (!isHover || scrollable) {
      return;
    }

    const handleScroll = () => {
      setIsHover(false);
    };

    document.addEventListener('scroll', handleScroll, {
      capture: true,
      once: true,
    });

    return () => {
      document.removeEventListener('scroll', handleScroll); //clean up
    };
  }, [isHover, scrollable]);

  return (
    <div ref={anchorRef}>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          ...children.props,
          ...tooltipEvents,
        })}
      {(isHover || isClick) && (
        <Portal anchorRef={anchorRef} isAttachRoot={!scrollable}>
          <Content
            ref={contentRef}
            color={color}
            direction={direction}
            {...tooltipEvents}
          >
            {content}
            <Arrow color={color} direction={direction} />
          </Content>
        </Portal>
      )}
    </div>
  );
};

const Content = styled('div')<{
  color: TooltipColor;
  direction: TooltipDirection;
}>`
  position: absolute;
  overflow: visible;
  padding: ${({ theme }) => `${theme.spacing(6)} ${theme.spacing(8)}`};
  min-width: fit-content;
  min-height: fit-content;
  white-space: pre;
  border-radius: 8px;
  outline: 0px;
  opacity: 1;
  background-color: ${({ theme, color }) =>
    color === 'primary'
      ? theme.palette.primary['300']
      : theme.palette.primary['100']};

  color: ${({ theme, color }) =>
    color === 'primary' ? theme.palette.white : theme.palette.black};
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${({ theme }) => theme.zIndex.TOOLTIP};

  ${({ theme }) => theme.typography.basic.regular}
`;

const Arrow = styled('div')<{
  color: TooltipColor;
  direction: TooltipDirection;
}>`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 0 3px 0 0;
  background-color: ${({ theme, color }) =>
    color === 'primary'
      ? theme.palette.primary['300']
      : theme.palette.primary['100']};

  clip-path: polygon(100% 100%, 0% 0%, 100% 0%);

  ${({ direction }) => {
    switch (direction) {
      default:
      case 'top':
        return css`
          transform: translate(-50%, 50%) rotate(135deg);
          bottom: 0;
          left: 50%;
          margin-bottom: 1px;
        `;
      case 'bottom':
        return css`
          transform: translate(-50%, -50%) rotate(315deg);
          top: 0;
          left: 50%;
          margin-top: 1px;
        `;
      case 'left':
        return css`
          transform: translate(50%, 50%) rotate(45deg);
          bottom: 50%;
          right: 0;
          margin-right: 1px;
        `;
      case 'right':
        return css`
          transform: translate(-50%, 50%) rotate(225deg);
          bottom: 50%;
          left: 0;
          margin-left: 1px;
        `;
    }
  }}
`;
