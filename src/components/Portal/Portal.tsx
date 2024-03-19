import { ZIndex } from '@/style/theme/zIndex';
import React, { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export const PORTAL_ROOT_ID = '__kongPortalRoot__';
export const DATA_PORTAL_ROOT = '[data-portal-root]';

function ensureDefaultPortal() {
  let defaultPortalContainer = document.getElementById(PORTAL_ROOT_ID);

  if (defaultPortalContainer instanceof Element) {
    return;
  }

  defaultPortalContainer = document.createElement('div');
  defaultPortalContainer.setAttribute('id', PORTAL_ROOT_ID);
  defaultPortalContainer.style.position = 'absolute';
  defaultPortalContainer.style.top = '0';
  defaultPortalContainer.style.left = '0';

  const suitablePortalRoot = document.querySelector(DATA_PORTAL_ROOT);

  if (suitablePortalRoot) {
    suitablePortalRoot.appendChild(defaultPortalContainer);
  } else {
    document.body.appendChild(defaultPortalContainer);
  }
}

export interface PortalProps {
  children: React.ReactNode;
  anchorRef?: React.RefObject<HTMLElement>;
  isAttachRoot?: boolean;
}

export const Portal = ({ children, anchorRef, isAttachRoot }: PortalProps) => {
  const portalElement = document.createElement('div');

  portalElement.style.position = 'absolute';
  portalElement.style.zIndex = isAttachRoot ? ZIndex.MODAL.toString() : '1';
  const elementRef = React.useRef<HTMLElement>(portalElement);

  useLayoutEffect(() => {
    ensureDefaultPortal();
    const rootElement =
      document.getElementById(PORTAL_ROOT_ID) || document.body;
    const parentElement = (!isAttachRoot && anchorRef?.current) || rootElement;

    if (!parentElement) {
      throw new Error('No ParentElement!');
    }

    if (anchorRef?.current) {
      if (!isAttachRoot) {
        parentElement.style.position = 'relative';
      }
      portalElement.style.top = '0';
      portalElement.style.left = '0';
    }

    const element = elementRef.current;
    parentElement.appendChild(element);

    return () => {
      parentElement.removeChild(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, anchorRef]);

  return createPortal(children, elementRef.current);
};
