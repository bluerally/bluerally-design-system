export type AnchorSide = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type AlignType = 'start' | 'center' | 'end';

const MAX_RETRY_COUNT = 2;

interface Size {
  width: number;
  height: number;
}

export interface Position {
  top: number;
  left: number;
}

interface AnchorPosition {
  top: number;
  left: number;
  anchorSide: AnchorSide;
}

interface BoxPosition extends Size, Position {}

interface AnchoredPosition {
  floatingElement: Element;
  anchorElement: Element;
  side?: AnchorSide;
  align?: AlignType;
  defaultPosition?: Position;
  isAttachRoot?: boolean;
  gap?: number;
}

export function getAnchoredPosition({
  floatingElement,
  anchorElement,
  side,
  align = 'start',
  defaultPosition,
  gap = 0,
  isAttachRoot,
}: AnchoredPosition) {
  const { scrollX, scrollY, innerWidth, innerHeight } = window;
  const viewportRect: BoxPosition = isAttachRoot
    ? {
        top: scrollY,
        left: scrollX,
        width: innerWidth,
        height: innerHeight,
      }
    : {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      };
  return calculateAnchoredPosition(
    floatingElement.getBoundingClientRect(),
    anchorElement.getBoundingClientRect(),
    side || 'bottom',
    align,
    defaultPosition || { top: 0, left: 0 },
    viewportRect,
    gap,
    isAttachRoot,
  );
}

function calculateAnchoredPosition(
  floatingRect: BoxPosition,
  anchorRect: BoxPosition,
  side: AnchorSide,
  align: AlignType,
  defaultPosition: Position,
  viewportRect: BoxPosition,
  gap: number,
  isAttachRoot?: boolean,
  retryCount = 0,
): AnchorPosition {
  const pos = calculatePosition(
    floatingRect,
    anchorRect,
    viewportRect,
    gap,
    side,
    align,
    isAttachRoot,
  );
  const anchorSide = side;
  if (!isAttachRoot) return { ...pos, anchorSide };

  if (pos.top < viewportRect.top) {
    if (retryCount < MAX_RETRY_COUNT) {
      return calculateAnchoredPosition(
        floatingRect,
        anchorRect,
        'bottom',
        align,
        defaultPosition,
        viewportRect,
        gap,
        isAttachRoot,
        retryCount + 1,
      );
    }
    pos.top = viewportRect.top;
  }
  if (pos.left < viewportRect.left) {
    pos.left = viewportRect.left;
  }
  if (pos.left + floatingRect.width > viewportRect.width + viewportRect.left) {
    pos.left =
      viewportRect.width +
      viewportRect.left -
      floatingRect.width -
      defaultPosition.left * 2;
  }
  if (pos.top + floatingRect.height > viewportRect.top + viewportRect.height) {
    if (retryCount < MAX_RETRY_COUNT) {
      return calculateAnchoredPosition(
        floatingRect,
        anchorRect,
        'top',
        align,
        defaultPosition,
        viewportRect,
        gap,
        isAttachRoot,
        retryCount + 1,
      );
    }
    pos.top =
      viewportRect.top +
      viewportRect.height -
      floatingRect.height -
      defaultPosition.top * 2;
  }

  return { ...pos, anchorSide };
}

function calculatePosition(
  elementDimensions: BoxPosition,
  anchorPosition: BoxPosition,
  viewportRect: BoxPosition,
  gap: number,
  side?: AnchorSide,
  align?: AlignType,
  isAttachRoot?: boolean,
) {
  let top = -1;
  let left = -1;

  switch (side) {
    case 'top':
      top =
        anchorPosition.top - elementDimensions.height + viewportRect.top - gap;
      left = anchorPosition.left + viewportRect.left;
      break;
    case 'left':
      top = anchorPosition.top + viewportRect.top;
      left =
        anchorPosition.left - elementDimensions.width + viewportRect.left - gap;
      break;
    case 'right':
      top = anchorPosition.top + viewportRect.top;
      left =
        anchorPosition.left + anchorPosition.width + viewportRect.left + gap;
      break;
    case 'bottom':
      top = anchorPosition.top + anchorPosition.height + viewportRect.top + gap;
      left = anchorPosition.left + viewportRect.left;
      break;
    case 'center': {
      const xAxis = anchorPosition.left + anchorPosition.width / 2;
      const yAxis = anchorPosition.top + anchorPosition.height / 2;
      const transformXPosition = elementDimensions.width / 2;
      const transformYPosition = elementDimensions.height / 2;

      const { top: scrollX, left: scrollY } = viewportRect;

      left = xAxis - transformXPosition + scrollX;
      top = yAxis - transformYPosition + scrollY;

      break;
    }
  }

  if (!isAttachRoot) {
    top -= anchorPosition.top;
    left -= anchorPosition.left;
  }

  if (side === 'center') {
    return { top, left };
  }

  switch (align) {
    default:
    case 'start':
      break;

    case 'end': {
      if (side === 'top' || side === 'bottom') {
        left = left + anchorPosition.width - elementDimensions.width;
        break;
      }
      top = top + anchorPosition.height - elementDimensions.height;
      break;
    }

    case 'center': {
      if (side === 'top' || side === 'bottom') {
        left = left + anchorPosition.width / 2 - elementDimensions.width / 2;
        break;
      }
      top = top + anchorPosition.height / 2 - elementDimensions.height / 2;
      break;
    }
  }

  return { top, left };
}
