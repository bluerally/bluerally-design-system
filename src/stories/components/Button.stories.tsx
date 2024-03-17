import { Icon } from '@/components';
import { Button } from '@/components/Button';
import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {},
};

const Template: Story = (args) => <Button {...args}>버튼</Button>;

export const Default = Template.bind({});

Default.args = {
  variant: 'filled',
  color: 'sky',
  size: 'sm',
  disabled: false,
};

export const WithIcons = () => (
  <WithIconButtonsContainer>
    <IconButton startIcon={<Icon icon="chevron-left" color="#fff" />}>
      버튼
    </IconButton>
    <IconButton endIcon={<Icon icon="chevron-right" color="#fff" />}>
      버튼
    </IconButton>
    <IconButton>
      <Icon icon="chevron-right" color="#fff" />
    </IconButton>
  </WithIconButtonsContainer>
);

const WithIconButtonsContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const IconButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing(5)};
`;
