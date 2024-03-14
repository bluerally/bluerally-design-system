import { Story } from '@storybook/react';
import React from 'react';
import { Progress } from '@/components/Progress';

export default {
  title: 'components/Progress',
  component: Progress,
  argTypes: {},
};

const Template: Story = (args) => <Progress {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: 'lg',
};
