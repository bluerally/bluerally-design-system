import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React from 'react';

import { Chip, ChipColors } from '@/components/Chip';

const CHIP_COLORS: ChipColors[] = [
  'primary',
  'gray',
  'error',
  'warning',
  'success',
  'orange',
  'lightgray',
  'purple',
  'darkPrimary',
];

const Template: Story = (arg) => (
  <Chip {...arg} onClickCancel={undefined} onClick={() => console.log('click')}>
    혐의 거래
  </Chip>
);

export const HasXIcon: Story = (arg) => {
  return (
    <ChipContainer>
      <Chip {...arg} onClickCancel={() => console.log('x')}>
        혐의 거래
      </Chip>
    </ChipContainer>
  );
};

export const Outlined: Story = () => {
  return (
    <ChipContainer>
      {CHIP_COLORS.map((color) => (
        <Chip key={color} color={color} variant="outlined">
          혐의 거래
        </Chip>
      ))}
    </ChipContainer>
  );
};

export const Filled: Story = () => {
  return (
    <ChipContainer>
      {CHIP_COLORS.map((color) => (
        <Chip key={color} color={color}>
          혐의 거래
        </Chip>
      ))}
    </ChipContainer>
  );
};

export default {
  title: 'components/Chip',
  component: Chip,
  argTypes: {},
};

export const Default = Template.bind({});

const ChipContainer = styled('div')`
  border-radius: 8px;
  height: 56px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(5)};
  gap: ${({ theme }) => theme.spacing(5)};
`;
