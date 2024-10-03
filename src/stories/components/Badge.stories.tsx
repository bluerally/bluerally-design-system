import { Badge } from '@/components/Badge';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Badge',
  component: Badge,
  argTypes: {},
};

const Template: Story = (args) => <Badge {...args}>파티장</Badge>;

export const Default = Template.bind({});

Default.args = {
  variant: 'primary-outline',
};
