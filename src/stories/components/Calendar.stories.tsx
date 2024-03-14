import { Calendar, CalendarInfo } from '@/components/Calendar';
import { formatter } from '@/utils/formatter';
import { Story } from '@storybook/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default {
  title: 'components/Calendar',
  component: Calendar,
  argTypes: {},
};

const today = dayjs();
const start = 2;
const end = 7;

const dummyInfo: CalendarInfo[] = [
  {
    date: formatter.date(today.subtract(2, 'day')),
    disabled: true,
  },
  {
    date: formatter.date(today.subtract(3, 'day')),
    disabled: true,
  },
  {
    date: formatter.date(today),
    active: true,
    emptyDots: 2,
  },
  {
    date: formatter.date(today.subtract(4, 'day')),
    fullDots: 2,
    emptyDots: 2,
  },
  {
    date: formatter.date(today.subtract(1, 'day')),
    fullDots: 1,
  },
  {
    startDate: formatter.date(today.add(start, 'day')),
    endDate: formatter.date(today.add(end, 'day')),
  },
];

const Template: Story = () => {
  const [selected, setSelected] = useState<string>('');

  const handleClick = (date: string) => {
    setSelected(date);
  };

  return (
    <div>
      <Calendar
        info={[...dummyInfo, { date: selected, active: true }]}
        onClick={handleClick}
      />
      <div style={{ marginTop: 20 }}>
        날짜 클릭 시, 해당 날짜에 불이 들어옵니다.
      </div>
    </div>
  );
};

export const Default = Template.bind({});
