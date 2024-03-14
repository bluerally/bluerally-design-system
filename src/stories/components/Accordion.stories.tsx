import { Story } from '@storybook/react';
import React from 'react';
import { Accordion } from '@/components/Accordion';

export default {
  title: 'components/Accordion',
  component: Accordion,
  argTypes: {},
};

const Template: Story = ({ summary, ...rest }) => (
  <Accordion summary={summary} {...rest}>
    <div>
      <b>의심거래보고제도(STR : Suspicious Transaction Report)</b>
    </div>
    금융거래와 관련하여 수수한 재산이 불법재산이라고 의심되는 합당한 근거가
    있거나, 금융거래의 상대방이 자금세탁행위를 하고 있다고 의심되는 합당한
    근거가 있는 경우 이를 금융정보분석원장에게 보고토록하는 제도
  </Accordion>
);

export const Default = Template.bind({});

Default.args = {
  summary: 'STR',
  expanded: false,
};
