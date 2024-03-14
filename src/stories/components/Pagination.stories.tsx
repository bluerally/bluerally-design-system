import { Story } from '@storybook/react';
import React from 'react';
import { Pagination } from '@/components/Pagination';

export default {
  title: 'components/Pagination',
  component: Pagination,
  argTypes: {
    hasEndButton: { control: 'boolean' },
    hasArrowButton: { control: 'boolean' },
  },
};

const Template: Story = ({
  totalPage = 7,
  hasEndButton,
  hasArrowButton,
  ...rest
}) => (
  <Pagination
    totalPage={totalPage}
    hasEndButton={hasEndButton}
    hasArrowButton={hasArrowButton}
    onSelect={(i) => console.log(i)}
    {...rest}
  />
);

export const Default = Template.bind({});
