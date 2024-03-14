import React, { useLayoutEffect } from 'react';
import {
  AlignType,
  AnchorSide,
  getAnchoredPosition,
  Position,
} from '../utils/getPosition';
import { useResizeObserver } from './useResizeObserver';

interface AnchoredPosition {
  elementRef?: React.RefObject<HTMLElement>;
  anchorRef?: React.RefObject<HTMLElement>;
  defaultPosition?: Position;
  side?: AnchorSide;
  align?: AlignType;
  gap?: number;
  isAttachRoot?: boolean;
}

export function useAnchoredPosition(
  {
    elementRef,
    anchorRef,
    defaultPosition = { top: 0, left: 0 },
    side,
    align,
    gap,
    isAttachRoot,
  }: AnchoredPosition,
  dependencies: any = [],
) {
  const updatePosition = React.useCallback(() => {
    if (
      !(elementRef?.current instanceof HTMLElement) ||
      !(anchorRef?.current instanceof HTMLElement)
    )
      return;

    const { top, left } = getAnchoredPosition({
      floatingElement: elementRef.current,
      anchorElement: anchorRef.current,
      side,
      align,
      defaultPosition,
      isAttachRoot,
      gap,
    });

    elementRef.current.style.left = left + defaultPosition.left + 'px';
    elementRef.current.style.top = top + defaultPosition.top + 'px';
    elementRef.current.style.opacity = '1';
    elementRef.current.style.transform = 'scale(1)';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, anchorRef, side, dependencies]);

  useLayoutEffect(updatePosition, [updatePosition]);

  useResizeObserver(updatePosition);

  return {
    elementRef,
    anchorRef,
  };
}
