import { Progress, ProgressProps } from '@/components';
import { Story } from '@storybook/react';

export default {
  title: 'components/Progress',
  component: Progress,
  argTypes: {},
};

const Template: Story<ProgressProps> = (arg) => <Progress {...arg} />;

export const Default = Template.bind({});

Default.args = {};
