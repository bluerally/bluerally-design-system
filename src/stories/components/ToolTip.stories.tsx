import styled from '@emotion/styled';
import { Story } from '@storybook/react';

import { Tooltip as TooltipBase } from '@/components/Tooltip';

export default {
  title: 'components/Tooltip',
  component: TooltipBase,
  argTypes: {},
};

const Template: Story = (args) => (
  <Container>
    <TooltipBase
      content={
        '동해물과 백두산이 마르고 닳도록\n하느님이 보우하사 우리나라 만세'
      }
      {...args}
    >
      <Opener>마우스를 올려보쟝</Opener>
    </TooltipBase>
  </Container>
);

export const Default = Template.bind({});
Default.args = {};

const Opener = styled('div')`
  width: 150px;
  height: 40px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.white};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
`;

const Container = styled('article')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;
