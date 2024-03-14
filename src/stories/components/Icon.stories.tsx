import { Story } from '@storybook/react';
import React from 'react';
import { Icon } from '@/components';

export default {
  title: 'components/Icon',
  component: Icon,
  argTypes: {},
};

const Template: Story = (args) => <Icon icon={args.icon} {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: 'chevron-left',
};
