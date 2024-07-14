import { CascaderData } from './Cascader';
import { CascaderItems } from './CascaderItems';
import styled from '@emotion/styled';
import React from 'react';

interface CascaderDropdownProps {
  subMenus?: CascaderData[];
  isOpen: boolean;
  depthLevel: number;
}

export const CascaderDropdown = ({
  subMenus,
  isOpen,
  depthLevel,
}: CascaderDropdownProps) => {
  depthLevel = depthLevel + 1;

  return isOpen ? (
    <DropDownContainer>
      {subMenus?.map((submenu, index) => (
        <CascaderItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </DropDownContainer>
  ) : null;
};

const DropDownContainer = styled('ul')`
  position: absolute;
  width: max-content;
  left: 95%;
  right: 1;
  min-width: 200px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 8px;
  outline: 1px solid ${({ theme }) => theme.palette.gray['200']};
  z-index: ${({ theme }) => theme.zIndex.MODAL};
`;
