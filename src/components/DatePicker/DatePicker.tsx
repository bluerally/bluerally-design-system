import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { CalendarIcon } from '../CalendarIcon';
import { Overlay as OverlayBase } from '../Overlay';
import { OverlayDimmedWrapper } from '../Overlay/OverlayWrapper';
import { TextInput } from '../TextInput';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { theme } from '@/style/theme';
import { DateTimeFormat, formatter } from '@/utils/formatter';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const SEPARATOR = '~';

export enum DatePickerIndex {
  START_DATE,
  END_DATE,
}

export type DateRangeType = [string?, string?];

type DateType<T> = T extends true ? DateRangeType : string;

export interface DatePickerProps<T> extends LabeledComponentType {
  isRange?: T;
  width?: number | string;
  placeholder?: string;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  value?: DateType<T>;
  onChange?: (value: DateType<T>, inputChanged?: boolean) => void;
  onEnterInput?: () => void;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  isAttachRoot?: boolean;
  disabled?: boolean;
  startYear?: number;
  endYear?: number;
}

export const DatePicker = <T extends boolean = false>({
  isRange,
  width = 311,
  placeholder = '',
  open: openProp,
  onOpen,
  value,
  onChange,
  onEnterInput,
  inputRef: inputRefProp,
  status,
  name,
  label,
  statusMessage,
  description,
  isAttachRoot,
  disabled,
  required,
  startYear,
  endYear,
}: DatePickerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const inputRef = useRef<HTMLInputElement | undefined>(
    null,
  ) as MutableRefObject<HTMLInputElement | null>;
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const openCalendar = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      onOpen?.(isOpen);
    },
    [onOpen],
  );

  useEffect(() => {
    if (disabled) {
      openCalendar(false);

      return;
    }
  }, [disabled, openCalendar]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const handleEnterInput = (e: KeyboardEvent): void => {
      if (onEnterInput && e.key === 'Enter') {
        e.preventDefault();
        onEnterInput();
        openCalendar(false);
      }
    };

    inputRef.current.addEventListener('keydown', handleEnterInput);

    return () => {
      inputRef.current?.removeEventListener('keydown', handleEnterInput);
    };
  }, [onEnterInput, openCalendar]);

  const handleClick = (date: string) => {
    setSelectedDate(date);

    if (isRange) {
      if (!Array.isArray(value)) {
        changeValue([date, ''] as string[] as DateType<T>);

        return;
      }
      const [startDate, endDate] = value;
      const newSelectedRange =
        !startDate || endDate ? [date, ''] : [startDate, date];
      const [newStartDate, newEndDate] = newSelectedRange;

      if (newEndDate && newStartDate > newEndDate) {
        newSelectedRange.reverse();
      }

      changeValue(newSelectedRange as DateType<T>);

      openCalendar(!newEndDate);

      return;
    }

    changeValue(date as DateType<T>);
    openCalendar(false);
  };

  const changeValue = (value: DateType<T>, inputChanged: boolean = false) => {
    onChange?.(value, inputChanged);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    changeValue(
      (isRange
        ? (value.split(SEPARATOR).map((v) => v.trim()) as DateRangeType)
        : value) as DateType<T>,
      true,
    );
    openCalendar(false);
  };

  const calcDate = (newValue?: DateType<T>) => {
    const date = newValue || value;
    if (isRange && Array.isArray(date)) {
      const [start = '', end = ''] = date;
      const newSelectedRange = [
        dayjs(start, DateTimeFormat.DATE, true).isValid()
          ? formatter.date(start)
          : '',
        dayjs(end, DateTimeFormat.DATE, true).isValid()
          ? formatter.date(end)
          : '',
      ];
      const [newStartDate, newEndDate] = newSelectedRange;

      if (newEndDate && newStartDate > newEndDate) {
        newSelectedRange.reverse();
      }

      changeValue(newSelectedRange as DateType<T>);
      return;
    }

    if (date === '') {
      changeValue('' as DateType<T>);
      setSelectedDate('');

      return;
    }

    const newDate = dayjs((date as string) || dayjs());

    if (!newDate.isValid()) {
      changeValue('' as DateType<T>);
      setSelectedDate('');

      return;
    }

    setSelectedDate(formatter.date(newDate));

    changeValue(formatter.date(newDate) as DateType<T>);
  };

  const handleOpen = () => {
    if (disabled) {
      return;
    }

    openCalendar(true);
    calcDate();
  };

  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      width={width}
      label={label}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <Container width={width}>
        <TextInput
          containerStyle={{ position: 'relative', overflow: 'unset' }}
          inputRef={(ref) => {
            inputRef.current = ref;

            if (inputRefProp) {
              inputRefProp.current = ref;
            }
          }}
          value={
            Array.isArray(value)
              ? value[0] && value.join(` ${SEPARATOR} `)
              : value
          }
          containerRef={inputContainerRef}
          onBlur={(e) => {
            const value = e.target.value;
            const newValue = (
              isRange
                ? (value.split(SEPARATOR).map((v) => v.trim()) as DateRangeType)
                : value
            ) as DateType<T>;
            calcDate(newValue);
          }}
          startIcon={
            <CalendarIcon
              onClick={handleOpen}
              color={theme.palette.newGray['400']}
            />
          }
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          endIcon={
            <IconBox isOpen={openProp || open}>
              <ChevronDown size={20} color={theme.palette.newGray['400']} />
            </IconBox>
          }
        />
        {(openProp || open) && (
          <OverlayDimmedWrapper isAttachRoot={isAttachRoot}>
            <Overlay
              open={openProp ?? open}
              anchorRef={inputContainerRef}
              gap={4}
              side="bottom"
              ignoreClickRefs={[inputContainerRef]}
              onClickOutside={() => openCalendar(false)}
              isAttachRoot={isAttachRoot}
            >
              <Calendar
                defaultDate={
                  Array.isArray(value) ? value[1] || value[0] : selectedDate
                }
                info={
                  isRange && Array.isArray(value)
                    ? [
                        value[1]
                          ? {
                              startDate: value[0],
                              endDate: value[1],
                            }
                          : { date: value[0], active: true },
                      ]
                    : [{ date: selectedDate, active: true }]
                }
                onClick={handleClick}
                startYear={startYear}
                endYear={endYear}
              />
              <Button
                variant="outlined"
                color="gray"
                width="100%"
                onClick={() => openCalendar(false)}
              >
                닫기
              </Button>
            </Overlay>
          </OverlayDimmedWrapper>
        )}
      </Container>
    </LabeledComponentWrapper>
  );
};

const Container = styled('div')<{
  width?: string | number;
}>`
  ${({ width }) =>
    `width: ${typeof width === 'number' ? `${width}px` : width}`};
  min-height: 42px;
`;

const Overlay = styled(OverlayBase)`
  background: ${({ theme }) => theme.palette.white};
  outline: 1px solid ${({ theme }) => theme.palette.newGray['200']};
  border-radius: 5px;
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(10)}`};
`;

const IconBox = styled('div')<{ isOpen: boolean }>`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
