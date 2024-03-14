import styled from '@emotion/styled';
import React from 'react';

import { LabeledComponentType } from '@/@types/LabeledComponentType';

import { theme } from '@/style/theme';

import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon';

export type ChipValue = string | number;
export interface ChipItem {
  title: string;
  value: ChipValue;
  disabled?: boolean;
}

export interface ChipGroupProps extends LabeledComponentType {
  gap?: number;
  values?: ChipValue[];
  onChange?: (selectedValues: ChipValue[]) => void;
  options: ChipItem[];
  enableAll?: boolean;
  allTitle?: string;
  allValue?: ChipValue;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const ChipGroup = ({
  gap = 4,
  values = [],
  onChange,
  options,
  label,
  name,
  status,
  statusMessage,
  description,
  enableAll = true,
  allTitle = '전체',
  allValue = 'ALL',
  disabled,
  required,
  size,
}: ChipGroupProps) => {
  const isSelectedAll =
    values.length === options.filter((option) => !option.disabled).length;

  const handleChange = (value: ChipValue) => {
    if (values.includes(value)) {
      return onChange?.(values.filter((val) => val !== value));
    }

    return onChange?.([...values, value]);
  };

  const handleAllClick = () => {
    if (isSelectedAll) {
      return onChange?.([]);
    }

    return onChange?.(
      options.reduce((acc, option) => {
        if (!option.disabled) {
          acc.push(option.value);
        }

        return acc;
      }, [] as ChipValue[]),
    );
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
      <ChipGroupContainer gap={gap}>
        {enableAll && (
          <Chip
            key={allValue}
            variant="outlined"
            onClick={handleAllClick}
            size={size}
            color={isSelectedAll ? 'primary' : 'gray'}
            startIcon={
              isSelectedAll && (
                <Icon icon="check" color={theme.palette.primary.main} />
              )
            }
            disabled={disabled}
          >
            {allTitle}
          </Chip>
        )}
        {options.map((option) => {
          const isChecked = values.includes(option.value);

          return (
            <Chip
              key={option.value}
              variant="outlined"
              onClick={() => handleChange(option.value)}
              size={size}
              color={isChecked ? 'primary' : 'gray'}
              startIcon={
                isChecked && (
                  <Icon icon="check" color={theme.palette.primary.main} />
                )
              }
              disabled={option.disabled || disabled}
            >
              {option.title}
            </Chip>
          );
        })}
      </ChipGroupContainer>
    </LabeledComponentWrapper>
  );
};

const ChipGroupContainer = styled('div')<{ gap: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme, gap }) => theme.spacing(gap)};
`;
