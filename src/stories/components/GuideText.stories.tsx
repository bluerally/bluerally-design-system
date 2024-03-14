import React from 'react';
import { Story } from '@storybook/react';
import { GuideText } from '@/components/GuideText';

export default {
  title: 'components/GuideText',
  component: GuideText,
  argTypes: {},
};

const Template: Story = (args) => {
  return <GuideText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  status: 'error',
  description: '설명입니다',
  statusMessage: 'status메시지입니다!',
};
