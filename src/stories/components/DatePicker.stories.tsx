import { DatePicker, DateRangeType } from '@/components/DatePicker';
import { formatter } from '@/utils';
import { Story } from '@storybook/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default {
  title: 'components/DatePicker',
  component: DatePicker,
  argTypes: {},
};

const Template: Story = () => {
  const [value, setValue] = useState<DateRangeType>([]);

  return (
    <div style={{ height: 600 }}>
      {value}
      <DatePicker
        isRange={true}
        placeholder={formatter.date(dayjs())}
        value={value}
        onChange={setValue}
        status="error"
      />
    </div>
  );
};

export const Default = Template.bind({});

export const SingleDatePicker: Story = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ height: 600 }}>
      <DatePicker
        placeholder={formatter.date(dayjs())}
        value={value}
        onChange={setValue}
        startYear={2000}
        endYear={2030}
      />
    </div>
  );
};
