import {
  AlignType,
  AnchorSide,
  Position,
  getAnchoredPosition,
} from '../utils/getPosition';
import { useResizeObserver } from './useResizeObserver';
import React, { useLayoutEffect } from 'react';

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

    let top, left;

    // 중앙에 위치할 조건
    const isCenterAlign = side === 'center' && align === 'center';

    if (isCenterAlign) {
      // 모달의 크기 계산
      const { width, height } = elementRef.current.getBoundingClientRect();

      // 화면 중앙 계산
      top = (window.innerHeight - height) / 2 + window.scrollY;
      left = (window.innerWidth - width) / 2 + window.scrollX;
    } else {
      // 기존의 getAnchoredPosition을 사용하여 위치 계산
      const { top: anchoredTop, left: anchoredLeft } = getAnchoredPosition({
        floatingElement: elementRef.current,
        anchorElement: anchorRef.current,
        side,
        align,
        defaultPosition,
        isAttachRoot,
        gap,
      });

      top = anchoredTop + defaultPosition.top;
      left = anchoredLeft + defaultPosition.left;
    }

    // 위치 설정
    elementRef.current.style.left = `${left}px`;
    elementRef.current.style.top = `${top}px`;
    elementRef.current.style.opacity = '1';
    elementRef.current.style.transform = 'scale(1)';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    elementRef,
    anchorRef,
    side,
    align,
    defaultPosition,
    isAttachRoot,
    gap,
    dependencies,
  ]);

  useLayoutEffect(updatePosition, [updatePosition]);

  useResizeObserver(updatePosition);

  return {
    elementRef,
    anchorRef,
  };
}
