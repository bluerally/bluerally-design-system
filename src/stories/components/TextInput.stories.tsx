import { TextInput } from '@/components/TextInput';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/TextInput',
  component: TextInput,
  argTypes: {},
};

const Template: Story = (args) => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="텍스트를 입력하세요"
      label="Label"
    />
  );
};

export const Default = Template.bind({});
