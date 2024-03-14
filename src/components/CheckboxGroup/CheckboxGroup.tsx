import React from 'react';
import styled from '@emotion/styled';
import { Checkbox } from '../Checkbox/Checkbox';

export type CheckboxOption = {
  key: string;
  value: string;
  disabled?: boolean;
};

export interface CheckboxGroupProps {
  values?: string[];
  gap?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: CheckboxOption[];
  disabled?: boolean;
}

export const CheckboxGroup = ({
  values,
  gap = 10,
  onChange,
  disabled = false,
  options,
}: CheckboxGroupProps) => {
  return (
    <>
      {options.map((option) => {
        return (
          <CheckboxGroupContainer key={option.key} gap={gap}>
            <Checkbox
              onChange={onChange}
              checked={values?.includes(option.value)}
              value={option.value}
              label={option.key}
              disabled={option.disabled || disabled}
            />
          </CheckboxGroupContainer>
        );
      })}
    </>
  );
};

const CheckboxGroupContainer = styled('div')<{ gap: number }>`
  padding-right: ${({ theme, gap }) => theme.spacing(gap)};
  display: inline-flex;
  align-items: inherit;
`;
