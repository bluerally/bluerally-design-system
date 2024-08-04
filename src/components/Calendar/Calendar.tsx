import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { LabeledComponentWrapper } from '@/components/@common/LabeledComponentWrapper';
import { theme } from '@/style/theme';
import { formatter } from '@/utils/formatter';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export interface CalendarInfo {
  date?: string;
  active?: boolean;
  disabled?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface CalendarProps extends LabeledComponentType {
  info?: CalendarInfo[];
  onClick?: (date: string) => void;
  width?: string | number;
  defaultDate?: string;
  border?: number;
  startYear?: number;
  endYear?: number;
}

interface DateInfo {
  active: boolean;
  disabled?: boolean;
  left?: boolean;
  right?: boolean;
}

export const Calendar = ({
  info,
  onClick,
  width = 300,
  defaultDate,
  label,
  name,
  status,
  statusMessage,
  description,
  required,
  border = 0,
}: CalendarProps) => {
  const [displayDate, setDisplayDate] = useState<Dayjs>(
    dayjs(dayjs(defaultDate).isValid() ? defaultDate : undefined),
  );
  const firstDate = displayDate.startOf('month');
  const firstDateOfCalendar = firstDate.subtract(
    (firstDate.day() + 6) % 7,
    'day',
  );

  const handleChangeDisplayMonth = (offset: number) => {
    setDisplayDate(displayDate.add(offset, 'month'));
  };

  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      label={label}
      width={width}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <CalendarContainer width={width} border={border}>
        <MonthSelector>
          <ChevronLeft
            onClick={() => handleChangeDisplayMonth(-1)}
            size={20}
            color={theme.palette.gray['500']}
            cursor="pointer"
          />
          <YearMonthContainer>
            <YearMonthText>{displayDate.year()}</YearMonthText>
            <YearMonthText>{displayDate.month() + 1}월</YearMonthText>
          </YearMonthContainer>
          <ChevronRight
            onClick={() => handleChangeDisplayMonth(1)}
            size={20}
            color={theme.palette.gray['500']}
            cursor="pointer"
          />
        </MonthSelector>
        <CalendarTable>
          <thead>
            <tr>
              {DAYS.map((day) => (
                <Th key={day}>{day}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(getWeekCount(displayDate))].map((_, week) => (
              <tr key={`week-${week}`}>
                {[...Array(7)].map((_, day) => {
                  const date = firstDateOfCalendar.add(week * 7 + day, 'day');
                  const isCurrentMonth =
                    date >= firstDate && date < firstDate.add(1, 'month');
                  const {
                    left,
                    right,
                    active,
                    disabled = false,
                  } = getDateInfo(info ?? [], date);

                  const isToday = date.isSame(dayjs(), 'day');
                  return (
                    <Td key={`day-${week}-${day}`}>
                      <DateContainer
                        onClick={() => onClick?.(formatter.date(date))}
                      >
                        <RangeContainer>
                          <RangePanel selected={left} />
                          <RangePanel selected={right} />
                        </RangeContainer>
                        <DateInner
                          disabled={disabled}
                          selected={active}
                          currentMonth={isCurrentMonth}
                          isToday={isToday}
                        >
                          {date.date()}
                        </DateInner>
                      </DateContainer>
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </CalendarTable>
      </CalendarContainer>
    </LabeledComponentWrapper>
  );
};

const getDateInfo: (info: CalendarInfo[], targetDate: Dayjs) => DateInfo = (
  info,
  targetDate,
) => {
  const dateInfo: DateInfo = { active: false };
  const strDate = formatter.date(targetDate);

  info.forEach(({ disabled, date, startDate, endDate, active }) => {
    if (date === strDate) {
      if (active) {
        dateInfo.active = true;
      }

      if (disabled) {
        dateInfo.disabled = true;
      }
    }

    if (!startDate || !endDate) {
      return;
    }

    if (startDate <= strDate && strDate <= endDate && disabled) {
      dateInfo.disabled = true;
      return;
    }

    if (startDate === strDate || endDate === strDate) {
      dateInfo.active = true;
    }

    if (startDate < strDate && strDate <= endDate) {
      dateInfo.left = true;
    }

    if (startDate <= strDate && strDate < endDate) {
      dateInfo.right = true;
    }
  });

  return dateInfo;
};

const getWeekCount = (date: Dayjs) => {
  const firstOfMonth = dayjs(date).startOf('month');
  const lastOfMonth = dayjs(date).endOf('month');

  const used = firstOfMonth.day() - 1 + lastOfMonth.date();

  return Math.ceil(used / 7);
};
const CalendarContainer = styled('div')<{
  width: string | number;
  border: number;
}>`
  ${({ theme, width, border }) => `
    width: ${typeof width === 'number' ? `${width}px` : width};
    ${
      border &&
      `
        border: ${border}px solid ${theme.palette.gray[200]};
        border-radius: 8px;
        padding: 24px 16px;
      `
    }
  `};
`;

const MonthSelector = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;

const YearMonthContainer = styled('div')`
  width: 127px;
  align-self: center;
  text-align: center;
  justify-content: center;
  display: flex;
  ${theme.typography.lg.semiBold}
`;

const YearMonthText = styled('div')`
  user-select: none;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(2)}`};
`;

const CalendarTable = styled('table')`
  width: 100%;
  color: ${({ theme }) => theme.palette.gray['500']};
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  width: 100%;
`;

const Th = styled('th')`
  padding: 8px;
  color: ${({ theme }) => theme.palette.gray['400']};
  ${theme.typography['basic-2'].regular}
`;

const Td = styled('td')`
  height: 44px;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 12px;
  line-height: 12px;
`;

const DateContainer = styled('div')`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${theme.typography.md.regular}
  color: ${({ theme }) => theme.palette.gray['500']};
`;

const DateInner = styled('div')<{
  disabled: boolean;
  selected: boolean;
  currentMonth: boolean;
  isToday: boolean;
}>`
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;

  font-weight: ${({ theme, isToday }) =>
    isToday ? theme.FontWeight.semiBold : theme.FontWeight.regular};

  background-color: ${({ theme, disabled, selected }) =>
    selected
      ? theme.palette.primary['300']
      : disabled
      ? theme.palette.primary['50']
      : 'transparent'};
  color: ${({ theme, disabled, selected, currentMonth, isToday }) =>
    isToday && !selected
      ? theme.palette.primary['300']
      : isToday && selected
      ? theme.palette.white
      : selected
      ? theme.palette.white
      : disabled
      ? theme.palette.gray['500']
      : theme.palette.gray[currentMonth ? '600' : '300']};
  border-radius: 50%;
`;

const RangeContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  color: ${({ theme }) => theme.palette.gray['500']};
`;

const RangePanel = styled('div')<{ selected?: boolean }>`
  background-color: ${({ selected = false, theme }) =>
    selected ? theme.palette.primary['50'] : 'transparent'};
  flex-grow: 1;
`;
