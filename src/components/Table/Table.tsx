import styled from '@emotion/styled';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  fullWidth?: boolean;
}

export const Table = ({ children, ...rest }: TableProps) => {
  return <TableContainer {...rest}>{children}</TableContainer>;
};

const TableContainer = styled('table')<{ fullWidth?: boolean }>`
  ${({ theme }) => theme.typography.basic.medium}

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-collapse: separate;
  border-spacing: 0;
  min-width: max-content;
  height: 100%;
  color: ${({ theme }) => theme.palette.gray['500']};

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray['100']};
  }
`;

const Thead = styled('thead')`
  color: ${({ theme }) => theme.palette.gray['500']};
`;

const Tr = styled('tr')`
  background-color: ${({ theme }) => theme.palette.gray['50']};
  height: 24px;
`;

const Th = styled('th')<{
  width?: string | number;
  minWidth?: string | number;
}>`
  border-top: 1px solid ${({ theme }) => theme.palette.gray['100']};
  word-break: keep-all;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(8)}`};

  ${({ width }) =>
    `width: ${typeof width === 'number' ? `${width}px` : width}`};
  ${({ minWidth }) =>
    `min-width: ${
      !minWidth
        ? 'max-content'
        : typeof minWidth === 'number'
        ? `${minWidth}px`
        : minWidth
    }`};
`;

const TBody = styled('tbody')``;

const Td = styled('td')`
  background-color: ${({ theme }) => theme.palette.white};
  line-height: 24px;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(8)}`};
`;

Table.Head = Thead;
Table.Row = Tr;
Table.HeadCell = Th;
Table.Body = TBody;
Table.Cell = Td;
