import { Align } from '@/@types';
import { Checkbox } from '@/components/Checkbox';
import { Radio } from '@/components/Radio';
import styled from '@emotion/styled';
import { get } from 'lodash';
import React from 'react';

export enum TABLE_RENDER_TYPE {
  RADIO,
  CHECKBOX,
}

export interface DataTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: DataTableColumn[];
  data: any[];
  fullWidth?: boolean;
  emptyContainerWidth?: number;
  emptyMessage?: React.ReactNode;
  rowHeight?: number | string;
  theadStyle?: React.CSSProperties;
  compare?: (row1: any, row2: any) => boolean;
  defaultAlign?: Align;
  disabledRowCondition?: (row: any, rowIndex: number) => boolean;
  highlightCondition?: (row: any, rowIndex: number) => string | undefined;
}

type CSSWhiteSpace =
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-wrap'
  | 'pre-line'
  | 'break-spaces';

export interface DataTableColumn<T extends any = any> {
  title: string;
  key?: string;
  colSpan?: number;
  headerRender?: (title: string) => JSX.Element;
  render?: (row: T, rowIndex: number) => JSX.Element;
  width?: number | string;
  minWidth?: number;
  align?: Align;
  headAlign?: Align;
  style?: React.CSSProperties;
  isMergable?: boolean;
  whiteSpace?: CSSWhiteSpace;
}

export const DataTable = ({
  columns,
  data,
  fullWidth = false,
  emptyMessage = '검색 결과가 없습니다.',
  emptyContainerWidth,
  rowHeight = 41,
  theadStyle,
  compare,
  defaultAlign,
  disabledRowCondition,
  highlightCondition,
  ...rest
}: DataTableProps) => {
  const getRowSpan = (row: any, rowIndex: number, data: any[]) => {
    let rowSpan = rowIndex >= 1 && compare?.(row, data[rowIndex - 1]) ? -1 : 1;

    if (rowSpan === 1) {
      for (const r of data.slice(rowIndex + 1)) {
        if (compare?.(row, r)) {
          rowSpan += 1;
        } else {
          break;
        }
      }
    }

    return rowSpan;
  };

  return (
    <TableContainer fullWidth={fullWidth} isEmpty={data.length === 0} {...rest}>
      <Thead style={theadStyle}>
        <TheadTr>
          {columns.map(
            (
              {
                headerRender,
                headAlign = 'center',
                colSpan,
                width,
                minWidth,
                title,
              },
              i,
            ) => (
              <HeadCell
                key={i}
                colSpan={colSpan ?? 1}
                width={width}
                minWidth={minWidth}
                align={headAlign}
                defaultAlign={defaultAlign}
              >
                {headerRender?.(title) ?? title}
              </HeadCell>
            ),
          )}
        </TheadTr>
      </Thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => {
            const rowSpan = getRowSpan(row, rowIndex, data);

            const isDisabledRow = disabledRowCondition?.(row, rowIndex);
            const highlightColor = highlightCondition?.(row, rowIndex);

            return (
              <tr key={rowIndex}>
                {columns.map(
                  (
                    {
                      style,
                      align,
                      colSpan,
                      render,
                      key,
                      isMergable,
                      whiteSpace,
                    },
                    i,
                  ) => {
                    if (isMergable && rowSpan === -1) return null;

                    return (
                      <Td
                        key={i}
                        colSpan={colSpan ?? 1}
                        rowSpan={isMergable ? rowSpan : 1}
                        style={style}
                        align={align}
                        height={rowHeight}
                        whiteSpace={whiteSpace}
                        defaultAlign={defaultAlign}
                        disabled={isDisabledRow}
                        highlightColor={highlightColor}
                      >
                        {render?.(row, rowIndex) ?? get(row, key ?? '') ?? ''}
                      </Td>
                    );
                  },
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <EmptyTd colSpan={columns.length}>
              <EmptyContentContainer emptyContainerWidth={emptyContainerWidth}>
                {emptyMessage}
              </EmptyContentContainer>
            </EmptyTd>
          </tr>
        )}
      </tbody>
    </TableContainer>
  );
};

export const renderCell = ({
  type,
  checked,
  disabled,
  onChange,
}: {
  type: TABLE_RENDER_TYPE;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    onChange(e);
  };
  if (type === TABLE_RENDER_TYPE.RADIO) {
    return (
      <InputContainer>
        <Radio checked={checked} onChange={handleChange} disabled={disabled} />
      </InputContainer>
    );
  }

  return (
    <InputContainer>
      <Checkbox checked={checked} onChange={handleChange} disabled={disabled} />
    </InputContainer>
  );
};

const TableContainer = styled('table')<{
  fullWidth: boolean;
  isEmpty: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  word-break: keep-all;
  border-collapse: separate;
  border-spacing: 0;
  height: ${({ isEmpty }) => (isEmpty ? '100%' : 'fit-content')};

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray['100']};
  }
`;

const Thead = styled('thead')`
  color: ${({ theme }) => theme.palette.gray['500']};
  position: sticky;
  top: 0;
  height: 36px;
`;

const TheadTr = styled('tr')`
  background-color: ${({ theme }) => theme.palette.gray['50']};
  min-height: 24px;
`;

const InputContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

const HeadCell = styled('th')<{
  width?: string | number;
  minWidth?: string | number;
  align?: Align;
  defaultAlign?: Align;
}>`
  border-top: 1px solid ${({ theme }) => theme.palette.gray['100']};
  word-break: keep-all;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(8)}`};
  text-align: ${({ align, defaultAlign }) => (align || defaultAlign) ?? 'left'};
  color: ${({ theme }) => theme.palette.gray['500']};

  ${({ theme }) => theme.typography.basic.medium};

  ${({ width }) =>
    `width: ${typeof width === 'number' ? `${width}px` : width}`};
  ${({ minWidth }) =>
    `min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth}`};
`;

const Td = styled('td')<{
  align?: Align;
  defaultAlign?: Align;
  whiteSpace?: CSSWhiteSpace;
  disabled?: boolean;
  highlightColor?: string;
}>`
  background-color: ${({ theme, disabled, highlightColor }) =>
    disabled
      ? theme.palette.gray['100']
      : highlightColor ?? theme.palette.white};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.FontWeight.regular};
  line-height: 24px;
  text-align: ${({ align, defaultAlign }) => align || defaultAlign || 'left'};
  padding: ${({ theme }) => `0 ${theme.spacing(8)}`};
  white-space: ${({ whiteSpace }) => whiteSpace ?? 'nowrap'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray['400'] : theme.palette.gray['500']};
`;

const EmptyTd = styled('td')`
  height: 100%;
  text-align: center;
`;

const EmptyContentContainer = styled('div')<{ emptyContainerWidth?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(12)};
  ${({ emptyContainerWidth }) => {
    if (!emptyContainerWidth) {
      return;
    }
    return `width: ${emptyContainerWidth}px;
      position: sticky;
      left: 0;
    `;
  }};
`;
