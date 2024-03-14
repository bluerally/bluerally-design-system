import { Story } from '@storybook/react';
import React from 'react';
import { Card } from '@/components/Card';
import styled from '@emotion/styled';

export default {
  title: 'components/Card',
  component: Card,
  argTypes: {},
};

const Template: Story = (args) => (
  <Card onClick={() => {}} {...args}>
    <CardContentContainer>
      <Count>09</Count>
      <Status>진행중</Status>
    </CardContentContainer>
  </Card>
);

export const Default = Template.bind({});

Default.args = {
  variant: 'default',
  color: 'gray',
};

const CardContentContainer = styled('div')`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(20)}`};
`;
const Count = styled('h1')`
  font-size: 40px;
`;
const Status = styled('span')`
  font-size: ${({ theme }) => theme.typography.md.regular};
  color: dimGray;
`;
