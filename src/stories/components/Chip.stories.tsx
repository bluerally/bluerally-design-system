import { Chip, ChipColors } from '@/components/Chip';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Chip',
  component: Chip,
  argTypes: {},
};

const Template: Story = (args) => <Chip {...args}>프리 다이빙</Chip>;

export const Default = Template.bind({});

Default.args = {
  variant: 'filled',
  color: 'sky',
};
