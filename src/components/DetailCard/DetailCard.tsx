import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { get, isArray, isNil } from 'lodash';

export interface ColumnItem<T> {
  key: string;
  title?: string;
  grid?: number;
  isDivided?: boolean;
  titleRender?: (data: T) => React.ReactNode | string;
  render?: (data: T) => React.ReactNode | string;
}

export type DetailColumns<T> = ColumnItem<T>[];

type BorderVariant = 'none' | 'border';
type Align = 'center' | 'left' | 'right';
type DetailCardAlign = {
  title?: Align;
  contents?: Align;
};

export interface DetailCardProps<T> {
  data: T | undefined | null;
  columns: DetailColumns<T> | DetailColumns<T>[];
  align?: DetailCardAlign;
  titleWidth?: number;
  radius?: boolean;
  variant?: BorderVariant;
  cellHeight?: number;
  autoHeight?: boolean;
}

const GRID_CELL_RATIO = 100 / 12;

const gridCalculator = (row: DetailColumns<any>) => {
  let pureCellCount = row.length;
  let leftGridCount = 12;

  row.forEach(({ grid }) => {
    if (grid) {
      pureCellCount--;
      leftGridCount -= grid;
    }
  });

  return leftGridCount / pureCellCount;
};

export const DetailCard = <T extends unknown>({
  data,
  columns,
  align,
  titleWidth,
  cellHeight,
  autoHeight,
  radius = true,
  variant = 'border',
}: DetailCardProps<T>) => {
  const isMultiDimension = columns.some((e) => isArray(e));

  const renderMultiDimensionRows = (rows: DetailColumns<T>[]) => {
    return (
      <CardContainer variant={variant} hasRadius={radius}>
        {rows.map((row, rIndex) => {
          const leftGrid = gridCalculator(row);

          return (
            <CardRow
              key={rIndex}
              variant={variant}
              height={cellHeight}
              autoHeight={autoHeight}
            >
              {row.map(
                (
                  { title, grid, key, isDivided, render, titleRender },
                  cIndex,
                ) => {
                  const cellGrid = grid
                    ? GRID_CELL_RATIO * grid
                    : GRID_CELL_RATIO * leftGrid;

                  return (
                    <CardColumnContainer
                      key={`${rIndex}-${cIndex}`}
                      grid={cellGrid}
                    >
                      {title && (
                        <CardColumnTitle
                          width={titleWidth ?? 100}
                          align={align?.title ?? 'left'}
                        >
                          <CardCell>
                            {titleRender && data ? titleRender(data) : title}
                          </CardCell>
                        </CardColumnTitle>
                      )}
                      <CardColumnContent
                        divided={!title && isDivided}
                        except={titleWidth ?? 100}
                        align={align?.contents ?? 'left'}
                      >
                        <CardCell>
                          {render && data
                            ? render(data)
                            : isNil(get(data, key))
                            ? ''
                            : String(get(data, key))}
                        </CardCell>
                      </CardColumnContent>
                    </CardColumnContainer>
                  );
                },
              )}
            </CardRow>
          );
        })}
      </CardContainer>
    );
  };

  const renderSingleDimensionRows = (rows: DetailColumns<T>) => {
    return (
      <CardContainer variant={variant} hasRadius={radius}>
        {rows.map(({ title, key, render, titleRender }) => (
          <CardRow
            key={key}
            variant={variant}
            height={cellHeight}
            autoHeight={autoHeight}
          >
            <CardColumnContainer>
              {title && (
                <CardColumnTitle
                  width={titleWidth}
                  align={align?.title ?? 'center'}
                >
                  <CardCell>
                    {titleRender && data ? titleRender(data) : title}
                  </CardCell>
                </CardColumnTitle>
              )}
              <CardColumnContent
                except={titleWidth ?? 100}
                align={align?.contents ?? 'left'}
              >
                <CardCell>
                  {render && data
                    ? render(data)
                    : isNil(get(data, key))
                    ? ''
                    : String(get(data, key))}
                </CardCell>
              </CardColumnContent>
            </CardColumnContainer>
          </CardRow>
        ))}
      </CardContainer>
    );
  };

  return isMultiDimension
    ? renderMultiDimensionRows(columns as DetailColumns<T>[])
    : renderSingleDimensionRows(columns as DetailColumns<T>);
};

const CardContainer = styled('ul')<{
  variant: BorderVariant;
  hasRadius?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
  vertical-align: middle;
  color: ${({ theme }) => theme.palette.black};
  background-color: ${({ theme }) => theme.palette.gray['100']};

  ${({ hasRadius }) =>
    hasRadius &&
    css`
      border-radius: 8px;

      & > li:first-child {
        border-radius: 7.5px 7.5px 0 0;
      }

      & > li:last-child {
        border-radius: 0 0 7.5px 7.5px;
      }
    `}

  ${({ theme, variant }) => {
    return (
      variant === 'border' &&
      css`
        border: 1px solid ${theme.palette.gray['100']};
      `
    );
  }}
`;

const CardRow = styled('li')<{
  variant: BorderVariant;
  height?: number;
  autoHeight?: boolean;
}>`
  width: calc(100% - 1px);
  height: ${({ height }) => (height ? `${height}px` : '50px')};
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  overflow: hidden;

  ${({ height, autoHeight }) => {
    return (
      autoHeight &&
      css`
        height: auto;
        min-height: ${height ? `${height}px` : '50px'};
        word-break: break-all;
      `
    );
  }}

  ${({ theme, variant }) => {
    return (
      variant === 'border' &&
      css`
        border-top: 0.5px solid ${theme.palette.gray['100']};
        border-bottom: 0.5px solid ${theme.palette.gray['100']};
      `
    );
  }}
`;

const CardColumnContainer = styled('div')<{ grid?: number }>`
  width: ${({ grid }) => `${grid ?? 100}%;`};
  height: auto;
  display: flex;
`;

const CardColumnTitle = styled('div')<{
  width?: number;
  align: Align;
}>`
  width: ${({ width }) => `${width}px`};
  height: 100%;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.palette.gray['50']};
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'center'};
`;

const CardColumnContent = styled('div')<{
  divided?: boolean;
  align: Align;
  except?: number;
}>`
  width: ${({ divided, except }) => `calc(100% - ${divided ? 1 : except}px)`};
  height: 100%;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'right'
      ? 'flex-end'
      : 'center'};
  padding: 10px;

  ${({ theme, divided }) =>
    divided &&
    css`
      border-left: 1px solid ${theme.palette.gray['100']};
    `}

  p {
    color: ${({ theme }) => theme.palette.gray['500']};
    ${({ theme }) => theme.typography.basic.regular}
  }
`;

const CardCell = styled('div')`
  color: ${({ theme }) => theme.palette.gray['500']};
  ${({ theme }) => theme.typography.basic.medium}
`;
