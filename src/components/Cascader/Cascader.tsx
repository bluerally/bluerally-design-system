import { CascaderItems } from './CascaderItems';
import styled from '@emotion/styled';
import React from 'react';

export interface CascaderProps {
  data: CascaderData[];
  onClickItem: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export interface CascaderData {
  key: string;
  label: string;
  subMenus?: CascaderData[];
}

export const Cascader = ({ data, onClickItem }: CascaderProps) => {
  const depthLevel = 0;
  return (
    <CascaderContainer>
      {data.map((menu, index) => {
        return (
          <CascaderItems
            items={menu}
            key={index}
            depthLevel={depthLevel}
            onClickItem={onClickItem}
          />
        );
      })}
    </CascaderContainer>
  );
};

const CascaderContainer = styled('ul')`
  width: max-content;
  min-width: 200px;
  border-radius: 8px;
  outline: 1px solid ${({ theme }) => theme.palette.gray['200']};
  color: ${({ theme }) => theme.palette.gray['600']};

  li:first-child {
    border-radius: 8px 8px 0 0;
  }

  li:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
