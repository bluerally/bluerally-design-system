import { Overlay } from '../Overlay/Overlay';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { Size } from '@/@types';
import { AlignType, AnchorSide } from '@/utils/getPosition';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { last } from 'lodash';
import { useEffect, useRef } from 'react';

const ESCAPE_KEY = 'Escape';
const MODAL_DIM_CLASS_NAME = 'modal-dim';

export interface ModalProps {
  open: boolean;
  size?: Size | number;
  height?: string | number;
  side?: AnchorSide;
  align?: AlignType;
  dimmed?: boolean;
  position?: { top: number; left: number };
  children: React.ReactNode;
  isOnClickOutside?: boolean;
  onClose?: () => void;
  isContentScroll?: boolean;
}

export const Modal = ({
  open,
  size = 'sm',
  height,
  side = 'top',
  align = 'center',
  dimmed = false,
  position = { top: 0, left: 0 },
  isOnClickOutside = false,
  children,
  onClose,
  isContentScroll = false,
}: ModalProps) => {
  const dimRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const body = window.document.querySelector('body');
    if (!body) {
      throw new Error('nobody');
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeydown = (e: KeyboardEvent): void => {
      if (onClose && e.key === ESCAPE_KEY) {
        const modals = document.querySelectorAll(`.${MODAL_DIM_CLASS_NAME}`);

        if (last(modals) !== dimRef.current) {
          return;
        }

        onClose();
      }
    };

    body.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = originalStyle;
      body.removeEventListener('keydown', handleKeydown);
    };
  }, [open, onClose]);

  if (typeof window === 'undefined') {
    return null;
  }

  return open ? (
    <Dim dimmed={dimmed} ref={dimRef} className={MODAL_DIM_CLASS_NAME}>
      <Overlay
        open={open}
        anchorRef={dimRef}
        defaultPosition={position}
        side={side}
        align={align}
        onClickOutside={isOnClickOutside ? onClose : undefined}
        isModal={true}
        isAttachRoot={true}
      >
        <ModalContainer size={size} height={height}>
          <Content fullHeight={isContentScroll}>{children}</Content>
        </ModalContainer>
      </Overlay>
    </Dim>
  ) : null;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

const Dim = styled('div')<{ dimmed: boolean }>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: ${({ theme, dimmed }) =>
    dimmed ? theme.palette.gray['900'] : 'transparent'};
  z-index: ${({ theme }) => theme.zIndex.DIM};
  opacity: 0.3;
  animation: fade_in 0.4s ease;
  overflow: hidden;
  margin: 0;
  padding: 0;

  @keyframes fade_in {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.3;
    }
  }
`;

const ModalContainer = styled('div')<{
  size: Size | number;
  height?: string | number;
}>`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 16px;
  overflow-y: auto;
  ${({ height }) =>
    `height: ${typeof height === 'number' ? `${height}px` : height}`};

  ${({ size }) => {
    if (typeof size === 'number') {
      return css`
        width: ${size}px;
      `;
    }

    switch (size) {
      default:
      case 'sm':
        return css`
          width: 360px;
        `;

      case 'md':
        return css`
          width: 420px;
          min-height: 267px;
        `;

      case 'lg':
        return css`
          width: 640px;
          min-height: 273px;
        `;
    }
  }};
`;

const Content = styled('div')<{
  fullHeight: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ fullHeight }) => fullHeight && `height: 100%`};
`;
