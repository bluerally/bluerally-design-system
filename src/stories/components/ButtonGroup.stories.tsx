import { ButtonGroup } from '@/components/ButtonGroup';
import { Story } from '@storybook/react';
import React, { MouseEventHandler, useState } from 'react';

export default {
  title: 'components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
};

const SPORTS_TYPE_CODES = [
  {
    id: 1,
    name: '프리다이빙',
  },
  {
    id: 2,
    name: '스쿠버다이빙',
  },
  {
    id: 3,
    name: '서핑',
  },
  {
    id: 4,
    name: '수영',
  },
];

const Template: Story = (args) => {
  const [value, setValue] = useState(1);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const selectedValue = Number(event.currentTarget.value);
    setValue(selectedValue);
  };

  return (
    <ButtonGroup
      {...args}
      value={value}
      onClick={handleClick}
      options={SPORTS_TYPE_CODES}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
