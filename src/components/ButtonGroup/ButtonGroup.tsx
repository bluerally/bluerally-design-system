import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { Button } from '../Button';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import styled from '@emotion/styled';
import React from 'react';

export type ButtonValue = string | number;
export interface ButtonItem {
  title: string;
  value: ButtonValue;
  disabled?: boolean;
}

export interface ButtonGroupProps extends LabeledComponentType {
  gap?: number;
  values?: ButtonValue[] | ButtonValue;
  onChange?: (selectedValues: ButtonValue[] | ButtonValue) => void;
  options: ButtonItem[];
  disabled?: boolean;
  size?: 'sm' | 'md';
  isMultiple?: boolean;
}

export const ButtonGroup = ({
  gap = 12,
  values = [],
  onChange,
  options,
  label,
  name,
  status,
  statusMessage,
  description,
  disabled,
  required,
  size,
  isMultiple = false,
}: ButtonGroupProps) => {
  const handleChange = (value: ButtonValue) => {
    const currentValues = Array.isArray(values) ? values : [values];

    if (!isMultiple) {
      return onChange?.(currentValues.includes(value) ? [] : [value]);
    }

    if (currentValues.includes(value)) {
      return onChange?.(currentValues.filter((val) => val !== value));
    }

    return onChange?.([...currentValues, value]);
  };
  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      label={label}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <ButtonGroupContainer gap={gap}>
        {options.map((option) => {
          const currentValues = Array.isArray(values) ? values : [values];

          const isChecked = currentValues.includes(option.value);

          return (
            <Button
              key={option.value}
              variant={isChecked ? 'primary-outline' : 'gray-outline'}
              onClick={() => handleChange(option.value)}
              size={size}
              disabled={option.disabled || disabled}
            >
              {option.title}
            </Button>
          );
        })}
      </ButtonGroupContainer>
    </LabeledComponentWrapper>
  );
};

const ButtonGroupContainer = styled('div')<{ gap: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => `${gap}px`};
`;
