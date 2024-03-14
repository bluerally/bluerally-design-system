import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { CascaderData } from './Cascader';
import { CascaderDropdown } from './CascaderDropDown';
import { Icon } from '../Icon';

export interface CascaderItemsProps {
  items: CascaderData;
  depthLevel: number;
  onClickItem?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export const CascaderItems = ({
  items,
  depthLevel,
  onClickItem,
}: CascaderItemsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cascaderItemsRef = useRef<HTMLLIElement | null>(null);
  const hasSubMenus = items.subMenus && items?.subMenus?.length > 0;

  const handleMouseUp = useCallback(() => {
    if (isDropdownOpen && cascaderItemsRef.current) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp, isDropdownOpen]);

  return (
    <MenuItemsContainer
      ref={cascaderItemsRef}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      onClick={(e) => {
        onClickItem && onClickItem(e);
      }}
    >
      <Items
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen ? 'true' : 'false'}
      >
        {items.label}
        {hasSubMenus && <Icon icon="chevron-right" />}
      </Items>
      {hasSubMenus && isDropdownOpen && (
        <CascaderDropdown
          depthLevel={depthLevel}
          subMenus={items.subMenus}
          isOpen={isDropdownOpen}
        />
      )}
    </MenuItemsContainer>
  );
};

const Items = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(7)}`};
`;

const MenuItemsContainer = styled('li')`
  display: flex;
  position: relative;
  font-size: 12px;
  line-height: 24px;

  &:hover {
    background: ${({ theme }) => theme.palette.primary['200']};
  }
`;
