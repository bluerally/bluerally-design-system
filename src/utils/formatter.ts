import dayjs, { Dayjs } from 'dayjs';
import { round } from 'lodash';

type ValidDateType = Date | Dayjs | string | number;
export type FarsightedType = string | number | null | undefined;
export type DateType = ValidDateType | undefined | null;

export enum DateTimeFormat {
  DATE = 'YYYY-MM-DD',
  DATE_KR = 'YYYY년 MM월 DD일',
  DATE_TIME = 'YYYY-MM-DD HH:mm',
  DATE_TIME_ISO = 'YYYY-MM-DDTHH:mm',
  DATE_TIME_MS = 'YYYY-MM-DD HH:mm:ss',
  TIME = 'HH:mm',
}

export class Formatter {
  convertValidDate = (
    dateFormatter: (date: ValidDateType) => string,
    value: DateType,
  ) => {
    if (!value) {
      return '-';
    }

    return dateFormatter(value);
  };

  convertValidNumber = (
    numberFormatter: (num: FarsightedType) => string,
    value: FarsightedType,
  ) => {
    if (Number.isNaN(value) || !value) {
      return '0';
    }

    return numberFormatter(value);
  };

  date = (date?: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.DATE);
  };

  dateKR = (date: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.DATE_KR);
  };

  dateTime = (date: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.DATE_TIME);
  };

  dateTimeISO = (date: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.DATE_TIME_ISO);
  };

  dateTimeMS = (date: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.DATE_TIME_MS);
  };

  time = (date: ValidDateType) => {
    return dayjs(date).format(DateTimeFormat.TIME);
  };

  amountKR = (value: FarsightedType) => {
    return Number(value).toLocaleString() + '원';
  };

  count = (value: FarsightedType) => {
    return Number(value).toLocaleString() + '회';
  };

  percent = (value: FarsightedType, num?: number) => {
    if (!Number.isInteger(value) && num === undefined) {
      return `${value}%`;
    }

    return `${round(Number(value), num ?? 0).toFixed(num ?? 0)}%`;
  };
}

export const formatter = new Formatter();
