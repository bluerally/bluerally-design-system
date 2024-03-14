import { Story } from '@storybook/react';
import React from 'react';
import { Stepper } from '@/components/Stepper';

export default {
  title: 'components/Stepper',
  component: Stepper,
  argTypes: {
    current: {
      control: {
        type: 'number',
      },
    },
  },
};

const Template: Story = ({ current = 0, ...arg }) => (
  <Stepper
    {...arg}
    current={current}
    steps={[
      { title: 'Personal Info', subtitle: 'hype boy' },
      { title: 'Education', subtitle: 'cookie' },
      { title: 'Review' },
    ]}
  />
);

export const Default = Template.bind({});
