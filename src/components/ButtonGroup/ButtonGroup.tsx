import { Button, ButtonVariant } from '../Button';
import { Size } from '@/@types';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import styled from '@emotion/styled';
import React, { MouseEventHandler, useState } from 'react';

export type ButtonItemOption = {
  id: number;
  name?: string;
};

export interface ButtonGroupProps extends LabeledComponentType {
  gap?: number;
  options: ButtonItemOption[];
  value?: string | number | (string | number)[];
  onClick?: (value: string | number) => void;
  size?: Size;
  variant?: ButtonVariant;
  width?: string;
  isMultiple?: boolean;
}

export const ButtonGroup = ({
  value,
  gap = 6,
  size = 'sm',
  options,
  onClick,
  width = 'auto',
  variant = 'primary-filled',
  isMultiple = false,
}: ButtonGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    Array.isArray(value) ? value.filter((v) => v) : value ? [value] : [],
  );

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const selectedValue = event.currentTarget.value;

    const isSelected = selectedValues.includes(selectedValue);

    setSelectedValues(
      isMultiple
        ? isSelected
          ? selectedValues.filter((value) => value !== selectedValue)
          : [...selectedValues, selectedValue]
        : [selectedValue],
    );

    if (onClick) {
      onClick(selectedValue);
    }
  };

  return (
    <ButtonGroupContainer gap={gap} width={width}>
      {options.map(({ id, name }) => {
        const isSelected = selectedValues.includes(String(id));

        return (
          <Button
            key={id}
            value={id}
            variant={isSelected ? variant : 'primary-outline'}
            onClick={handleButtonClick}
            size={size}
            width="100%"
          >
            {name || id}
          </Button>
        );
      })}
    </ButtonGroupContainer>
  );
};

const ButtonGroupContainer = styled('div')<{ gap: number; width: string }>`
  display: flex;
  gap: ${({ theme, gap }) => theme.spacing(gap / 2)};
  width: ${({ width }) => width};
`;
