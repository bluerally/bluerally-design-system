import { Story } from '@storybook/react';
import React, { useCallback, useState } from 'react';

import { Tabs, TabsProps } from '@/components/Tabs';

export default {
  title: 'components/Tabs',
  component: Tabs,
  argTypes: {
    color: { options: ['primary', 'gray'] },
  },
};

const Template: Story<TabsProps> = () => {
  const [selected, setSelected] = useState('str');

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
        { label: 'STR', value: 'str', content: <>str</> },
        { label: 'KYC', value: 'kyc', content: <>kyc</> },
        { label: 'WLF', value: 'wlf', content: <>wlf</>, disabled: true },
      ]}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
