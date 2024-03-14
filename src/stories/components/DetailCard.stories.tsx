import { Story } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/Button';
import {
  DetailCard,
  DetailCardProps,
  DetailColumns,
} from '@/components/DetailCard';
import { Switch } from '@/components/Switch';

export default {
  title: 'components/DetailCard',
  component: DetailCard,
  argTypes: {},
};

const data = {
  id: '1',
  nickname: 'Heman',
  group: 'Heimdall',
  position: 'FE',
  createdAt: '2021-12-22 09:00:00',
  updatedAt: '2022-01-12 17:30:00',
  lastLoggedIn: '2022-10-20 14:30:00',
  component: false,
};

const Template: Story<DetailCardProps<typeof data>> = (args) => {
  const [newData, setNewData] = useState(data);

  const newColumns: DetailColumns<typeof data>[] = [
    ...multiDimensionColumns,
    [
      {
        key: 'component',
        title: '컴포넌트',
        render: (d) => (
          <Switch
            checked={newData.component}
            onChange={() => setNewData({ ...newData, component: !d })}
          />
        ),
      },
    ],
    [
      {
        key: 'longText',
        title: '아주 긴 텍스트',
        render: () => new Array(100).fill('아주 긴 텍스트').join(' '),
      },
    ],
  ];

  return (
    <DetailCard
      {...args}
      data={newData}
      columns={newColumns}
      titleWidth={100}
    />
  );
};

export const Default = Template.bind({});

export const SingleDimensionData = () => {
  const [newData, setNewData] = useState(data);

  const newColumns: DetailColumns<typeof data> = [
    ...singleDimensionColumns,
    {
      key: 'component',
      title: '컴포넌트',
      render: (d) => (
        <Switch
          checked={newData.component}
          onChange={() => setNewData({ ...newData, component: !d })}
        />
      ),
    },
  ];

  return <DetailCard data={newData} columns={newColumns} titleWidth={100} />;
};

export const Divided = () => {
  const [newData, setNewData] = useState(data);

  const newColumns: DetailColumns<typeof data>[] = [
    ...dividedColumns,
    [
      {
        key: 'component',
        title: '컴포넌트',
        render: (d) => (
          <Switch
            checked={newData.component}
            onChange={() => setNewData({ ...newData, component: !d })}
          />
        ),
      },
    ],
  ];

  return (
    <DetailCard
      data={newData}
      radius={false}
      columns={newColumns}
      align={{ title: 'left', contents: 'center' }}
      titleWidth={100}
    />
  );
};

Default.args = {};

const dividedColumns = [
  [
    {
      key: 'id',
      title: 'id',
      grid: 9,
    },
    { key: 'idSection', isDivided: true },
  ],
  [
    {
      key: 'nickname',
      title: '닉네임',
      grid: 9,
    },
    {
      key: 'nicknameSection',
      isDivided: true,
      render: () => (
        <Button
          size="xs"
          color="primary"
          onClick={() => console.log('닉네임 변경완료')}
        >
          닉네임 변경
        </Button>
      ),
    },
  ],
  [
    {
      key: 'group',
      title: '그룹',
      grid: 9,
    },
    { key: 'groupSection', isDivided: true },
  ],
  [
    {
      key: 'createdAt',
      title: '가입일시',
      grid: 9,
    },
    {
      key: 'createdAtSection',
      isDivided: true,
      render: () => (
        <Button
          size="xs"
          color="primary"
          onClick={() => console.log('가입일시 변경완료')}
        >
          가입일시 변경
        </Button>
      ),
    },
  ],
];

const singleDimensionColumns = [
  {
    key: 'id',
    title: 'id',
  },
  {
    key: 'nickname',
    title: '닉네임',
    grid: 4,
  },
  {
    key: 'position',
    title: '직책',
  },
  {
    key: 'group',
    title: '그룹',
  },
  {
    key: 'createdAt',
    title: '가입일시',
  },
  {
    key: 'updatedAt',
    title: '수정일시',
  },
  {
    key: 'lastLoggedIn',
    title: '최근 로그인',
  },
];

const multiDimensionColumns = [
  [
    {
      key: 'id',
      title: 'id',
    },
  ],
  [
    {
      key: 'nickname',
      title: '닉네임',
      grid: 4,
    },
    {
      key: 'position',
      title: '직책',
    },
  ],
  [
    {
      key: 'group',
      title: '그룹',
    },
  ],
  [
    {
      key: 'createdAt',
      title: '가입일시',
    },
    {
      key: 'updatedAt',
      title: '수정일시',
    },
    {
      key: 'lastLoggedIn',
      title: '최근 로그인',
    },
  ],
];
