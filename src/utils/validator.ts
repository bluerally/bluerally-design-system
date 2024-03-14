import { DateTimeFormat, formatter } from './formatter';

export class Validator {
  dateTimeDefault = (value: string) => {
    return (
      value.length === DateTimeFormat.DATE_TIME.length &&
      formatter.dateTime(value) === value
    );
  };

  dateDefault = (value: string) => {
    return (
      value.length === DateTimeFormat.DATE.length &&
      formatter.dateTime(value) === value
    );
  };

  timeDefault = (value: string) => {
    return (
      value.length === DateTimeFormat.TIME.length &&
      formatter.time(`${formatter.date()} ${value}`) === value
    );
  };
}

export const validator = new Validator();
