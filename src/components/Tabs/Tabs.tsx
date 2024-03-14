import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

type TabsColor = 'primary' | 'gray';
export interface TabItemProps {
  label: string;
  value: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  items: TabItemProps[];
  color?: TabsColor;
  selected: string;
  onTabChange?: (value: string) => void;
  preRender?: boolean;
  tabPanelStyle?: CSSProperties;
}

export const Tabs = ({
  items,
  color = 'primary',
  selected,
  onTabChange,
  preRender,
  tabPanelStyle,
  ...rest
}: TabsProps) => {
  return (
    <>
      <TabContainer role="tablist" {...rest}>
        {items.map((item) => {
          return (
            <TabBase
              role="tab"
              key={item.value}
              selected={item.value === selected}
              onClick={() => {
                onTabChange?.(item.value);
              }}
              color={color}
              disabled={item.disabled}
            >
              {item.label}
            </TabBase>
          );
        })}
      </TabContainer>
      {preRender ? (
        items.map((item) => {
          return (
            <PreRenderedTabPanel
              key={item.value}
              style={tabPanelStyle}
              role="tabpanel"
              visible={item.value === selected}
            >
              {item.content}
            </PreRenderedTabPanel>
          );
        })
      ) : (
        <TabPanel style={tabPanelStyle} role="tabpanel">
          {items.find((item) => item.value === selected)?.content}
        </TabPanel>
      )}
    </>
  );
};

const TabContainer = styled('div')`
  width: max-content;
  display: flex;
  position: relative;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const TabBase = styled('button')<{
  selected: boolean;
  color: TabsColor;
}>`
  ${({ theme }) => theme.typography.md.regular}
  border-radius: 8px 8px 0px 0px;
  background-color: ${({ theme }) => theme.palette.white};
  min-width: 92px;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(8)};
  cursor: pointer;
  transition: all 0.3s;

  ${({ selected, color, theme }) => {
    switch (color) {
      case 'primary': {
        return css`
          color: ${selected
            ? theme.palette.primary.main
            : theme.palette.gray['500']};
          box-shadow: inset 0px -4px 0px ${selected ? theme.palette.primary.main : theme.palette.gray['200']};
        `;
      }
      case 'gray': {
        return css`
          color: ${selected
            ? theme.palette.gray['500']
            : theme.palette.gray['500']};
          box-shadow: inset 0px -4px 0px ${selected ? theme.palette.gray['500'] : theme.palette.gray['200']};
        `;
      }
    }
  }}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      color: ${theme.palette.gray['200']};
      box-shadow: inset 0px -4px 0px ${theme.palette.gray['100']};
    `};
`;

const PreRenderedTabPanel = styled('div')<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? 'unset' : 'none')};
`;

const TabPanel = styled('div')``;
