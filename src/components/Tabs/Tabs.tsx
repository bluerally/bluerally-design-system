import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

export interface TabItemProps {
  label: string;
  value: string;
  content: React.ReactNode;
}

export interface TabsProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  items: TabItemProps[];
  selected: string;
  onTabChange?: (value: string) => void;
  preRender?: boolean;
  tabPanelStyle?: CSSProperties;
}

export const Tabs = ({
  items,
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
  width: 100%;
  display: flex;
  position: relative;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const TabBase = styled('button')<{
  selected: boolean;
}>`
  ${({ theme }) => theme.typography.lg.semiBold}
  border-radius: 8px 8px 0px 0px;
  background-color: ${({ theme }) => theme.palette.white};
  width: 100%;
  min-width: 92px;
  padding: 16px 12px;
  cursor: pointer;
  transition: all 0.3s;

  ${({ selected, theme }) => {
    return css`
      color: ${selected
        ? theme.palette.gray['900']
        : theme.palette.gray['400']};
      box-shadow: ${selected
        ? `inset 0px -1px 0px ${theme.palette.gray['300']}`
        : `inset 0px -1px 0px ${theme.palette.gray['50']}`};
    `;
  }}
`;

const PreRenderedTabPanel = styled('div')<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? 'unset' : 'none')};
`;

const TabPanel = styled('div')``;
