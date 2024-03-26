import { TextArea } from '@/components/TextArea';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/TextArea',
  component: TextArea,
  argTypes: {},
};

const Template: Story = (args) => {
  const [value, setValue] = useState('');
  return (
    <TextArea
      placeholder={args.placeholder ?? '텍스트를 입력하세요'}
      {...args}
      onChange={(e) => setValue(e.target.value)}
      value={args.value ?? value}
    />
  );
};

export const Default = Template.bind({});
