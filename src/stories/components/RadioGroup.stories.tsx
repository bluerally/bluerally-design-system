import { Story } from '@storybook/react';
import React, { useCallback, useState } from 'react';

import { RadioGroup } from '@/components/RadioGroup';

export default {
  title: 'components/RadioGroup',
  component: RadioGroup,
  argTypes: {},
};

const KYC_MODEL_TYPE_CODES = [
  {
    title: '전체',
    value: 'ALL',
  },
  {
    title: 'KYC이행',
    value: 'INITIAL',
  },
  {
    title: '정기평가',
    value: 'BEHAVIOR',
  },
];

const Template: Story = (args) => {
  const [value, setValue] = useState('ALL');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={handleChange}
      options={KYC_MODEL_TYPE_CODES}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
