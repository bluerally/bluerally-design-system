import { Story } from '@storybook/react';
import React from 'react';
import { Header } from '@/components/Header';

export default {
  title: 'components/Header',
  component: Header,
  argTypes: {},
};

const Template: Story = (args) => (
  <Header
    title={args.title}
    description={args.description}
    {...args}
    action={<button>액션버튼</button>}
  />
);

export const Default = Template.bind({});

Default.args = {
  title: '타이틀 영역',
  subTitle: '소 타이틀 영역',
  description: '설명 영역입니다. 해당 페이지의 설명을 입력할 수 있습니다.',
};
