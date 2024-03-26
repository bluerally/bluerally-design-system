import { Button } from '@/components/Button';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {},
};

const Template: Story = (args) => <Button {...args}>버튼</Button>;

export const Default = Template.bind({});

Default.args = {
  variant: 'filled',
  color: 'sky',
  size: 'sm',
  disabled: false,
};
