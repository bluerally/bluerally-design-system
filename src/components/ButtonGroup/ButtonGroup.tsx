import { Button } from '../Button';
import { Size } from '@/@types';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import styled from '@emotion/styled';
import React, { MouseEventHandler } from 'react';

export type ButtonItemOption = {
  id: number;
  name?: string;
};

export interface ButtonGroupProps extends LabeledComponentType {
  gap?: number;
  options: ButtonItemOption[];
  value?: string | number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: Size;
  width?: string;
}

export const ButtonGroup = ({
  value,
  gap = 6,
  size = 'sm',
  options,
  onClick,
  width = '384px',
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContainer gap={gap} width={width}>
      {options.map(({ id, name }) => {
        return (
          <Button
            key={id}
            value={id}
            variant={id === value ? 'filled' : 'outlined'}
            color={id === value ? 'sky' : 'gray'}
            onClick={onClick}
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
