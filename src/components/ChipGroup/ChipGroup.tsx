import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import React from 'react';

export type ChipValue = string | number;
export interface ChipItem {
  title: string;
  value: ChipValue;
  disabled?: boolean;
}

export interface ChipGroupProps extends LabeledComponentType {
  gap?: number;
  values?: ChipValue[];
  options: ChipItem[];
  enableAll?: boolean;
  allTitle?: string;
  allValue?: ChipValue;
}

export const ChipGroup = ({
  gap = 4,
  values = [],
  options,
  label,
  name,
  status,
  statusMessage,
  description,
  enableAll = true,
  allTitle = '전체',
  allValue = 'ALL',
  required,
}: ChipGroupProps) => {
  const isSelectedAll =
    values.length === options.filter((option) => !option.disabled).length;

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
            color={isSelectedAll ? 'sky' : 'gray'}
            startIcon={
              isSelectedAll && (
                <Icon icon="check" color={theme.palette.primary.main} />
              )
            }
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
              color={isChecked ? 'sky' : 'gray'}
              startIcon={
                isChecked && (
                  <Icon icon="check" color={theme.palette.primary.main} />
                )
              }
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
