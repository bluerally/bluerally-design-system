import { Story } from '@storybook/react';
import React from 'react';
import { Radio } from '@/components/Radio';

export default {
  title: 'components/Radio',
  component: Radio,
  argTypes: {},
};

const Template: Story = (args) => {
  return <Radio {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  label: 'label',
};
