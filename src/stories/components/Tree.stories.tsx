import { Story } from '@storybook/react';
import React from 'react';
import { Tree } from '@/components/Tree';

export default {
  title: 'components/Tree',
  component: Tree,
  argTypes: {},
};

const treeData = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'components',
        label: 'components',
        children: [
          {
            key: 'button',
            label: 'Button',
          },
          {
            key: 'tree',
            label: 'Tree',
            children: [
              {
                key: 'tree.tsx',
                label: 'Tree.tsx',
              },
            ],
          },
        ],
      },
      {
        key: 'style',
        label: 'style',
        children: [
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
    children: [],
  },
];

const Template: Story = (args) => {
  return (
    <Tree
      {...args}
      data={treeData}
      isMulti
      onClickNode={(e) => {
        console.log(e);
      }}
      onCheckNode={(e) => {
        console.log(e);
      }}
    />
  );
};

export const Default = Template.bind({});
