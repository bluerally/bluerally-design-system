import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { SegmentButton, SegmentButtonItem } from '@/components/SegmentButton';

export default {
  title: 'components/SegmentButton',
  component: SegmentButton,
  argTypes: {},
};

const KYC_MODEL_TYPE_CODES: SegmentButtonItem[] = [
  {
    title: '회원명',
    value: 'NAME',
  },
  {
    title: 'NID',
    value: 'NID',
  },
  {
    title: 'UUID',
    value: 'UUID',
  },
];

const Template: Story = (args) => {
  const [selected, setSelected] = useState<string>('NID');

  return (
    <SegmentButton
      {...args}
      value={selected}
      onChange={(value) => {
        setSelected(value);
      }}
      options={KYC_MODEL_TYPE_CODES}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
