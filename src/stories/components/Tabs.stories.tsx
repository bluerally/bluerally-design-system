import { Tabs, TabsProps } from '@/components/Tabs';
import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React, { useCallback, useState } from 'react';

export default {
  title: 'components/Tabs',
  component: Tabs,
};

const Template: Story<TabsProps> = () => {
  const [selected, setSelected] = useState('comment');

  const handleSelect = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  return (
    <Tabs
      onTabChange={handleSelect}
      selected={selected}
      items={[
        {
          label: '댓글 0',
          value: 'comment',
          content: <ContentContainer>댓글</ContentContainer>,
        },
        {
          label: '멤버 관리 5',
          value: 'member',
          content: <ContentContainer>멤버 관리</ContentContainer>,
        },
      ]}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};

const ContentContainer = styled('div')`
  padding-top: 20px;
`;
