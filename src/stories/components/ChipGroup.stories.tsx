import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { ChipGroup, ChipValue } from '@/components/ChipGroup';

export default {
  title: 'components/ChipGroup',
  component: ChipGroup,
  argTypes: {},
};

const CONFIRM_STATUS = [
  {
    title: '미확인',
    value: '0',
  },
  {
    title: '보고',
    value: '1',
  },
  {
    title: '보고제외',
    value: '2',
  },
  {
    title: '기보고',
    value: '3',
  },
  {
    title: '기보고제외',
    value: '4',
  },
];

const Template: Story = (args) => {
  const [selectedValues, setSelectedValues] = useState<ChipValue[]>([]);

  const handleChange = (values: ChipValue[]) => {
    setSelectedValues(values);
  };

  return (
    <ChipGroup
      options={CONFIRM_STATUS}
      {...args}
      values={selectedValues}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  options: CONFIRM_STATUS,
  gap: 4,
  enableAll: true,
};
