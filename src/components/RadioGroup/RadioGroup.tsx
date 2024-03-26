import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { Radio } from '@/components/Radio';
import styled from '@emotion/styled';
import React from 'react';

export type RadioOption = {
  key?: string;
  title?: string;
  value: string | number;
  disabled?: boolean;
};

export interface RadioGroupProps
  extends Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'onChange'
    >,
    LabeledComponentType {
  gap?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
}

export const RadioGroup = ({
  value,
  gap = 10,
  onChange,
  disabled = false,
  options,
  status,
  name,
  label,
  statusMessage,
  description,
  required,
}: RadioGroupProps) => {
  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      label={label}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <RadioGroupContainer>
        {options.map((option) => {
          return (
            <RadioGroupInner role="radiogroup" key={option.value} gap={gap}>
              <Radio
                value={option.value}
                disabled={option.disabled || disabled}
                checked={option.value === value}
                onChange={onChange}
                label={option.title || option.key}
              />
            </RadioGroupInner>
          );
        })}
      </RadioGroupContainer>
    </LabeledComponentWrapper>
  );
};

const RadioGroupInner = styled('div')<{ gap: number }>`
  padding-right: ${({ theme, gap }) => theme.spacing(gap)};
  display: inline-flex;
  align-items: inherit;
`;

const RadioGroupContainer = styled('div')``;
