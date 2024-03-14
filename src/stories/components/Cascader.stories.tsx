import { Story } from '@storybook/react';
import React from 'react';
import { Cascader } from '@/components/Cascader';
import styled from '@emotion/styled';

export default {
  title: 'components/Cascader',
  component: Cascader,
  argTypes: {},
};

const cascaderData = [
  {
    key: 'src',
    label: 'src',
    subMenus: [
      {
        key: 'components',
        label: 'components',
        subMenus: [
          {
            key: 'button',
            label: 'Button',
          },
          {
            key: 'cascader',
            label: 'Cascader',
            subMenus: [
              {
                key: 'cascader.tsx',
                label: 'Cascader.tsx',
              },
            ],
          },
        ],
      },
      {
        key: 'style',
        label: 'style',
        subMenus: [
          {
            key: 'index.ts',
            label: 'index.ts',
          },
        ],
      },
      {
        key: 'stories',
        label: 'stories',
      },
    ],
  },
  {
    key: 'package.json',
    label: 'package.json',
    subMenus: [],
  },
];

const Template: Story = (args) => {
  return (
    <CascaderContainer>
      <Cascader
        {...args}
        data={cascaderData}
        onClickItem={() => console.log('on click item')}
      />
    </CascaderContainer>
  );
};

export const Default = Template.bind({});

const CascaderContainer = styled('div')`
  height: 200px;
`;
