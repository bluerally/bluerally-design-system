import { ButtonGroup, ButtonValue } from '@/components/ButtonGroup';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
};

const SPORTS = [
  {
    title: '프리다이빙',
    value: '0',
  },
  {
    title: '스쿠버다이빙',
    value: '1',
  },
  {
    title: '서핑',
    value: '2',
  },
  {
    title: '수영',
    value: '3',
  },
];

const Template: Story = (args) => {
  const [selectedValues, setSelectedValues] = useState<ButtonValue[]>([]);

  const handleChange = (values: ButtonValue[]) => {
    setSelectedValues(values);
  };

  return (
    <ButtonGroup
      options={SPORTS}
      {...args}
      values={selectedValues}
      onChange={handleChange}
      isMultiple
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  options: SPORTS,
  gap: 4,
  enableAll: true,
};
