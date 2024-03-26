import { PORTAL_ROOT_ID, Portal } from '../Portal/Portal';
import { useAnchoredPosition } from '@/hooks/useAnchoredPosition';
import { AlignType, AnchorSide, Position } from '@/utils/getPosition';
import styled from '@emotion/styled';
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';

interface OverlayProps {
  anchorRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  open: boolean;
  ignoreClickRefs?: React.RefObject<HTMLElement>[];
  onClickOutside?: Function | null;
  defaultPosition?: Position;
  side?: AnchorSide;
  align?: AlignType;
  isModal?: boolean;
  isAttachRoot?: boolean;
  gap?: number;
}

const Overlay = ({
  anchorRef,
  children,
  open,
  ignoreClickRefs,
  onClickOutside,
  defaultPosition,
  side,
  align,
  isModal,
  isAttachRoot,
  gap,
  ...rest
}: OverlayProps): ReactElement => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useAnchoredPosition(
    {
      elementRef: overlayRef,
      anchorRef,
      defaultPosition,
      side,
      align,
      gap,
      isAttachRoot,
    },
    [overlayRef.current],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (overlayRef.current?.contains(e.target as Node) || !onClickOutside) {
        return;
      }

      const portalRootElement = document.getElementById(PORTAL_ROOT_ID);

      if (isModal && portalRootElement?.contains(e.target as Node)) {
        return;
      }

      if (
        ignoreClickRefs &&
        ignoreClickRefs.some(({ current }) =>
          current?.contains(e.target as Node),
        )
      )
        return;

      onClickOutside();
    },
    [onClickOutside, overlayRef, ignoreClickRefs, isModal],
  );

  useEffect(() => {
    if (!onClickOutside || !handleClick) return;

    document.addEventListener('mousedown', handleClick, { capture: true });

    return () => {
      document.removeEventListener('mousedown', handleClick, { capture: true });
    };
  }, [onClickOutside, handleClick]);

  return open ? (
    <Portal anchorRef={anchorRef} isAttachRoot={isAttachRoot}>
      <OverlayContainer ref={overlayRef} {...rest}>
        {children}
      </OverlayContainer>
    </Portal>
  ) : (
    <></>
  );
};

export { Overlay };

const OverlayContainer = styled('div')`
  position: absolute;
  overflow: hidden;

  @keyframes overlay-appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  visibility: var(--styled-overlay-visibility);
  :focus {
    outline: none;
  }
`;
