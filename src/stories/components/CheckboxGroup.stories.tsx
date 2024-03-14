import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { CheckboxGroup } from '@/components/CheckboxGroup';

export default {
  title: 'components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {},
};

const CONFIRM_STATUS = [
  {
    key: '전체',
    value: 'ALL',
  },
  {
    key: '미확인',
    value: '0',
  },
  {
    key: '보고',
    value: '1',
  },
  {
    key: '보고제외',
    value: '2',
  },
  {
    key: '기보고',
    value: '3',
  },
  {
    key: '기보고제외',
    value: '4',
  },
];

const Template: Story = () => {
  const [values, setValues] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values.includes(e.target.value)) {
      return setValues(values.filter((value) => value !== e.target.value));
    }

    setValues(values.concat(e.target.value));
  };

  return (
    <CheckboxGroup
      values={values}
      onChange={handleChange}
      options={CONFIRM_STATUS}
    />
  );
};

export const Default = Template.bind({});

Default.args = {};
