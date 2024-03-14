import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Align } from '@/@types';
import { theme } from '@/style/theme';

import { Icon } from '../Icon';

export interface PaginationProps {
  defaultPage?: number;
  totalPage: number;
  siblingCount?: number;
  boundaryCount?: number;
  hasEndButton?: boolean;
  hasArrowButton?: boolean;
  align?: Align;
  onSelect?: (index: number) => void;
}

export const Pagination = ({
  defaultPage = 1,
  totalPage,
  siblingCount = 1,
  boundaryCount = 1,
  hasEndButton = false,
  hasArrowButton = true,
  align = 'right',
  onSelect,
}: PaginationProps) => {
  const [current, setCurrent] = useState(defaultPage);

  useEffect(() => {
    setCurrent(defaultPage);
  }, [defaultPage]);

  const handleSelect = (page: number) => () => {
    movePage(page);
  };

  const movePage = useCallback(
    (page: number) => {
      if (page > totalPage || page <= 0) {
        return;
      }

      setCurrent(page);
      onSelect?.(page);
    },
    [onSelect, totalPage],
  );

  const handleNext = useCallback(() => {
    movePage(current + 1);
  }, [movePage, current]);

  const handlePrev = useCallback(() => {
    movePage(current - 1);
  }, [movePage, current]);

  const handleFirst = useCallback(() => {
    movePage(1);
  }, [movePage]);

  const handleLast = useCallback(() => {
    movePage(totalPage);
  }, [movePage, totalPage]);

  const renderPages: (number | '...')[] = useMemo(() => {
    if (totalPage < 4 + boundaryCount * 2 + siblingCount * 2) {
      return [...Array(totalPage)].map((_, i) => i + 1);
    }

    if (current <= boundaryCount + siblingCount + 2) {
      return [
        ...getRange(0, boundaryCount + siblingCount * 2 + 2),
        '...',
        ...getRange(totalPage - boundaryCount, boundaryCount),
      ];
    }

    if (current > totalPage - boundaryCount - siblingCount - 2) {
      return [
        ...getRange(0, boundaryCount),
        '...',
        ...getRange(
          totalPage - boundaryCount - siblingCount * 2 - 2,
          boundaryCount + siblingCount * 2 + 2,
        ),
      ];
    }

    return [
      ...getRange(0, boundaryCount),
      '...',
      ...getRange(current - siblingCount - 1, siblingCount * 2 + 1),
      '...',
      ...getRange(totalPage - boundaryCount, boundaryCount),
    ];
  }, [totalPage, boundaryCount, siblingCount, current]);

  return (
    <Container align={align}>
      {hasEndButton && (
        <CellContainer>
          <ArrowButton onClick={handleFirst}>
            <Icon
              color={theme.palette.primary.main}
              icon="chevrons-left"
              size={24}
              width={24}
              height={24}
            />
          </ArrowButton>
        </CellContainer>
      )}
      {hasArrowButton && (
        <CellContainer>
          <ArrowButton onClick={handlePrev} isDisabled={current === 1}>
            <Icon
              color={
                current === 1
                  ? theme.palette.gray.main
                  : theme.palette.primary.main
              }
              icon="chevron-left"
              size={24}
              width={24}
              height={24}
            />
          </ArrowButton>
        </CellContainer>
      )}

      <PageContainer>
        {renderPages.map((page, i) =>
          page === '...' ? (
            <Ellipsis key={`ellipsis-${i}`} />
          ) : (
            <CellContainer key={`cell-container-${i}`}>
              <PageButton
                onClick={handleSelect(page)}
                selected={page === current}
                key={page}
              >
                {page}
              </PageButton>
            </CellContainer>
          ),
        )}
      </PageContainer>

      {hasArrowButton && (
        <CellContainer>
          <ArrowButton onClick={handleNext} isDisabled={totalPage === current}>
            <Icon
              color={
                totalPage === current
                  ? theme.palette.gray.main
                  : theme.palette.primary.main
              }
              icon="chevron-right"
              size={24}
              width={24}
              height={24}
            />
          </ArrowButton>
        </CellContainer>
      )}
      {hasEndButton && (
        <CellContainer>
          <ArrowButton onClick={handleLast}>
            <Icon
              color={theme.palette.primary.main}
              icon="chevrons-right"
              size={24}
              width={24}
              height={24}
            />
          </ArrowButton>
        </CellContainer>
      )}
    </Container>
  );
};

const getRange = (start: number, count: number) => {
  return [...Array(count)].map((_, i) => start + i + 1);
};

const Container = styled('div')<{ align: Align }>`
  width: 100%;
  display: flex;
  margin: ${({ theme }) => `${theme.spacing(7)} 0 ${theme.spacing(6)}`};
  line-height: normal;
  text-align: center;

  ${({ align }) => {
    switch (align) {
      case 'left':
        return css`
          justify-content: flex-start;
        `;
      case 'center':
        return css`
          justify-content: center;
        `;
      case 'right':
        return css`
          justify-content: flex-end;
        `;
    }
  }}
`;

const PageContainer = styled('div')`
  display: flex;
  margin: 0 5px;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CellContainer = styled('div')`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowButton = styled('div')<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 0;
  cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
  user-select: none;

  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.palette.gray.main : theme.palette.primary.main};
  border: 1px solid rgba(0, 0, 0, 0);
`;

const Ellipsis = () => {
  return <EllipsisContainer>...</EllipsisContainer>;
};

const EllipsisContainer = styled('div')`
  width: 24px;
  height: 48px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding: ${({ theme }) => `${theme.spacing(8)} ${theme.spacing(3)}`};
  user-select: none;
`;

const PageButton = styled('div')<{ selected?: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  line-height: 32px;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.palette.white};
  cursor: pointer;
  user-select: none;

  ${({ selected }) =>
    selected
      ? css`
          color: ${theme.palette.primary.main};
          border: 1px solid ${theme.palette.primary.main};
          border-radius: 8px;
        `
      : css`
          color: ${theme.palette.gray['500']};
          border: 1px solid rgba(0, 0, 0, 0);
        `}
`;
