import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { isNil } from 'lodash';
import React, { useMemo, useState } from 'react';

import { LabeledComponentType } from '@/@types/LabeledComponentType';

import { formatter } from '@/utils/formatter';

import { LabeledComponentWrapper } from '@/components/@common/LabeledComponentWrapper';
import { Icon } from '@/components/Icon';

import { theme } from '@/style/theme';
import { FontWeight } from '@/style/theme/typography';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MAX_DOTS = 3;
enum MODES {
  Calendar,
  Year,
  Month,
}

export interface CalendarInfo {
  date?: string;
  active?: boolean;
  disabled?: boolean;
  emptyDots?: number;
  fullDots?: number;
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
  emptyDots: number;
  fullDots: number;
}

const DEFAULT_START_YEAR = 1900;
const DEFAULT_END_YEAR = 2099;

const getYearRange = (start: number, end: number) => {
  if (isNil(start) || isNil(end) || start > end) {
    return [];
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const Calendar = ({
  info,
  onClick,
  width = 260,
  defaultDate,
  label,
  name,
  status,
  statusMessage,
  description,
  required,
  border = 0,
  startYear = DEFAULT_START_YEAR,
  endYear = DEFAULT_END_YEAR,
}: CalendarProps) => {
  const [displayDate, setDisplayDate] = useState<Dayjs>(
    dayjs(dayjs(defaultDate).isValid() ? defaultDate : undefined),
  );
  const firstDate = displayDate.startOf('month');
  const firstDateOfCalendar = firstDate.subtract(firstDate.day(), 'day');
  const [mode, setMode] = useState(MODES.Calendar);

  const yearOptions = useMemo(() => {
    if (startYear > endYear) {
      return getYearRange(DEFAULT_START_YEAR, DEFAULT_END_YEAR);
    }

    return getYearRange(startYear, endYear);
  }, [endYear, startYear]);

  const handleChangeDisplayMonth = (offset: number) => {
    setDisplayDate(displayDate.add(offset, 'month'));
  };

  const handleClickYear = (year: number) => {
    setDisplayDate(dayjs(displayDate).set('year', year));
    setMode(MODES.Calendar);
  };

  const handleClickMonth = (month: number) => {
    setDisplayDate(dayjs(displayDate).set('month', month));
    setMode(MODES.Calendar);
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
          <MonthChangeIcon
            onClick={() => handleChangeDisplayMonth(-1)}
            icon="chevron-left"
            size={24}
            width={24}
            height={24}
            draggable={false}
            color={theme.palette.primary.main}
          />
          <YearMonthContainer>
            <YearMonthText onClick={() => setMode(MODES.Year)}>
              {displayDate.year()}년
            </YearMonthText>
            <YearMonthText onClick={() => setMode(MODES.Month)}>
              {displayDate.month() + 1}월
            </YearMonthText>
          </YearMonthContainer>
          <MonthChangeIcon
            onClick={() => handleChangeDisplayMonth(1)}
            icon="chevron-right"
            size={24}
            width={24}
            height={24}
            draggable={false}
            color={theme.palette.primary.main}
          />
        </MonthSelector>
        {mode === MODES.Calendar && (
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
                      emptyDots,
                      fullDots,
                      disabled = false,
                    } = getDateInfo(info ?? [], date);

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
                          >
                            {date.date()}
                          </DateInner>
                        </DateContainer>
                        <CalendarDotContainer>
                          {[...Array(Math.min(fullDots, MAX_DOTS))].map(
                            (_, i) => (
                              <CalendarDot
                                full={true}
                                key={`dots-${week}-${day}-full-${i}`}
                              />
                            ),
                          )}
                          {[
                            ...Array(Math.min(emptyDots, MAX_DOTS - fullDots)),
                          ].map((_, i) => (
                            <CalendarDot
                              full={false}
                              key={`dots-${week}-${day}-empty-${i}`}
                            />
                          ))}
                        </CalendarDotContainer>
                      </Td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </CalendarTable>
        )}
        {mode === MODES.Year && (
          <YearMonthSelectContainer>
            {yearOptions.map((_year) => (
              <YearMonthBlock
                onClick={() => handleClickYear(_year)}
                key={_year}
              >
                {_year}년
              </YearMonthBlock>
            ))}
          </YearMonthSelectContainer>
        )}
        {mode === MODES.Month && (
          <YearMonthSelectContainer>
            {[...Array(12)].map((_, i) => (
              <YearMonthBlock onClick={() => handleClickMonth(i)} key={`${i}`}>
                {(i + 1).toString().padStart(2, '0')}월
              </YearMonthBlock>
            ))}
          </YearMonthSelectContainer>
        )}
      </CalendarContainer>
    </LabeledComponentWrapper>
  );
};

const getDateInfo: (info: CalendarInfo[], targetDate: Dayjs) => DateInfo = (
  info,
  targetDate,
) => {
  const dateInfo: DateInfo = { active: false, emptyDots: 0, fullDots: 0 };
  const strDate = formatter.date(targetDate);

  info.forEach(
    ({ disabled, date, startDate, endDate, emptyDots, fullDots, active }) => {
      if (date === strDate) {
        if (emptyDots) {
          dateInfo.emptyDots = emptyDots;
        }

        if (fullDots) {
          dateInfo.fullDots = fullDots;
        }

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
    },
  );

  return dateInfo;
};

const getWeekCount = (date: Dayjs) => {
  const firstOfMonth = dayjs(date).startOf('month');
  const lastOfMonth = dayjs(date).endOf('month');

  const used = firstOfMonth.day() + lastOfMonth.date();

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
  gap: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const MonthChangeIcon = styled(Icon)`
  user-select: none;
  align-self: center;
`;

const YearMonthContainer = styled('div')`
  width: 127px;
  align-self: center;
  text-align: center;
  justify-content: center;
  display: flex;

  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
`;

const YearMonthText = styled('div')`
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(5)}`};

  :hover {
    background-color: ${({ theme }) => theme.palette.primary['100']};
  }
`;

const CalendarTable = styled('table')`
  width: 100%;
  color: ${({ theme }) => theme.palette.gray['600']};
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  width: 100%;
`;

const Th = styled('th')`
  padding: ${({ theme }) => `${theme.spacing(4)} 0 ${theme.spacing(8)}`};
  color: ${({ theme }) => theme.palette.gray.main};
  font-size: 12px;
  line-height: 12px;
  font-weight: ${FontWeight.regular};
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
`;

const DateInner = styled('div')<{
  disabled: boolean;
  selected: boolean;
  currentMonth: boolean;
}>`
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;

  background-color: ${({ theme, disabled, selected }) =>
    selected
      ? theme.palette.primary['400']
      : disabled
      ? theme.palette.primary['50']
      : 'transparent'};
  color: ${({ theme, disabled, selected, currentMonth }) =>
    selected
      ? theme.palette.white
      : disabled
      ? theme.palette.gray['500']
      : theme.palette.gray[currentMonth ? '600' : '300']};
  border-radius: 8px;
`;

const RangeContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
`;

const RangePanel = styled('div')<{ selected?: boolean }>`
  background-color: ${({ selected = false, theme }) =>
    selected ? theme.palette.primary['200'] : 'transparent'};
  flex-grow: 1;
`;

const CalendarDotContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  height: 8px;
  align-items: center;
`;

const CalendarDot = styled('div')<{ full: boolean }>`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};

  background-color: ${({ theme, full }) =>
    full ? theme.palette.primary.main : 'transparent'};
`;

const YearMonthSelectContainer = styled('div')`
  display: flex;
  justify-content: center;
  row-gap: 8px;
  flex-wrap: wrap;
  max-height: 250px;
  overflow-y: scroll;
`;

const YearMonthBlock = styled('div')`
  display: inline-block;
  width: 57px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  user-select: none;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.gray['600']};
  padding: ${({ theme }) => `${theme.spacing(5)} 0`};
  text-align: center;
`;
