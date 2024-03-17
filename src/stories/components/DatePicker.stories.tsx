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

export const Default = Template.bind({});

export const RangeDatePicker: Story = () => {
  const [value, setValue] = useState<DateRangeType>([]);

  return (
    <div style={{ height: 600 }}>
      <DatePicker
        isRange={true}
        placeholder={formatter.date(dayjs())}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
