import { SearchInput } from '@/components/SearchInput';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/SearchInput',
  component: SearchInput,
  argTypes: {},
};

const Template: Story = (args) => {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(e, value) => console.log(value + ' 검색!')}
      onClickReset={() => setValue('')}
      placeholder="검색"
    />
  );
};

export const Default = Template.bind({});
