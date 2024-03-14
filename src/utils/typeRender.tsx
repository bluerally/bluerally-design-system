import { curry, isNaN } from 'lodash';
import { DateType, FarsightedType, formatter } from './formatter';

export type RenderedDataType =
  | 'text'
  | 'date'
  | 'dateKR'
  | 'date'
  | 'dateTime'
  | 'dateTimeMS'
  | 'amount'
  | 'count'
  | 'number'
  | 'boolean'
  | 'link'
  | 'percent';

type ParamType = DateType | FarsightedType;

export interface RenderType {
  text(value: ParamType): string;
  date(value: ParamType): string;
  dateKR(value: ParamType): string;
  dateTime(value: ParamType): string;
  dateTimeMS(value: ParamType): string;
  amount(value: ParamType): string;
  count(value: ParamType): string;
  number(value: ParamType): string;
  boolean(value: ParamType): string;
  link(value: ParamType): JSX.Element;
  percent(value: ParamType, decimal?: number | string): string;
}

export class TypeRender implements RenderType {
  formatter = formatter;

  text(value: ParamType) {
    return value ? String(value) : '-';
  }

  date(value: ParamType) {
    return curry(this.formatter.convertValidDate)(this.formatter.date)(value);
  }

  dateKR(value: ParamType) {
    return curry(this.formatter.convertValidDate)(this.formatter.dateKR)(value);
  }

  dateTime(value: ParamType) {
    return curry(this.formatter.convertValidDate)(this.formatter.dateTime)(
      value,
    );
  }

  dateTimeMS(value: ParamType) {
    return curry(this.formatter.convertValidDate)(this.formatter.dateTimeMS)(
      value,
    );
  }

  amount(value: FarsightedType) {
    return curry(this.formatter.convertValidNumber)(this.formatter.amountKR)(
      value,
    );
  }

  count(value: FarsightedType) {
    return curry(this.formatter.convertValidNumber)(this.formatter.count)(
      value,
    );
  }

  number(value: ParamType) {
    if (Number.isNaN(value)) {
      return '-';
    }
    return value ? Math.round(Number(value)).toLocaleString() : '0';
  }

  boolean(value: ParamType | boolean) {
    return value ? 'Y' : 'N';
  }

  link(value: FarsightedType) {
    return <a href={String(value ?? '#')}>{value}</a>;
  }

  percent(value: number | string, decimal: number | string = 2) {
    if (isNaN(Number(value)) || !value) {
      return '-';
    }

    const pow = 10 ** Number(decimal);
    const round = Math.round(Number(value) * pow) / pow;

    return `${round}%`;
  }
}

export const typeRender = new TypeRender();
