import { Story } from '@storybook/react';
import React, { useMemo } from 'react';

import { Checkbox } from '@/components/Checkbox';

import {
  Button,
  DataTable,
  DataTableColumn,
  TABLE_RENDER_TYPE,
  renderCell,
} from '@/components';
import { useTableCheck, useTableRadio } from '@/hooks';
import { theme } from '@/style/theme';

export default {
  title: 'components/DataTable',
  component: DataTable,
  argTypes: {
    emptyMessageType: {
      defaultValue: 'No result',
      control: 'radio',
      options: ['No result', 'Before search'],
    },
    isCheckMode: { control: 'boolean' },
    isEmptyMode: { control: 'boolean' },
  },
};

const dummyData: any[] = [
  {
    data1: '내용 표시',
    data2: '내용 표시',
    data3: '내용 표시',
    data4: 'X',
    data5: {
      text: '결제 필요',
    },
  },
  {
    data1: '선택',
    data2: '선택',
    data3: '선택',
    data4: 'X',
    data5: {
      text: '결제 필요',
    },
  },
];

for (let i = 0; i < 8; i++) {
  dummyData.push({
    data1: '내용 표시',
    data2: '내용 표시',
    data3: '내용 표시',
    data4: 'X',
    data5: {
      text: ['읽지 않음', '결제 완료', '읽음'][i % 3],
    },
  });
}

const enabledDummyRows = [1, 3, 5, 7, 9];

const Template: Story = ({ isEmptyMode = false, ...rest }) => {
  const { handleSelectAll, handleSelect, selected } = useTableCheck();
  const { handleSelect: handleSelectRadio, selected: radioSelected } =
    useTableRadio();

  const dummyColumns: DataTableColumn[] = useMemo(
    () => [
      {
        title: '',
        width: 40,
        headerRender: () =>
          renderCell({
            type: TABLE_RENDER_TYPE.CHECKBOX,
            checked:
              selected?.length === enabledDummyRows.length &&
              dummyData.length > 0,
            onChange: (e) => {
              handleSelectAll?.(
                dummyData.length,
                e.target.checked,
                enabledDummyRows,
              );
            },
          }),
        render: (_, rowIndex) =>
          renderCell({
            type: TABLE_RENDER_TYPE.CHECKBOX,
            checked: selected.includes(rowIndex),
            onChange: () => {
              handleSelect?.(rowIndex);
            },
            disabled: !enabledDummyRows.includes(rowIndex),
          }),
      },
      {
        title: '',
        width: 40,
        render: (_, rowIndex) =>
          renderCell({
            type: TABLE_RENDER_TYPE.RADIO,
            checked: radioSelected === rowIndex,
            onChange: () => {
              handleSelectRadio?.(rowIndex);
            },
          }),
      },
      {
        title: 'No.',
        width: 40,
        render: (_, rowIndex) => <>{rowIndex + 1}</>,
      },
      {
        title: '분류',
        minWidth: 150,
        headerRender: (title) => {
          return (
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                gap: 6,
              }}
            >
              <Checkbox /> {title}
            </div>
          );
        },
        render: ({ data1 }) => {
          if (data1 === '선택') {
            return <a style={{ color: 'blue' }}>{data1}</a>;
          } else {
            return <>{data1}</>;
          }
        },
      },
      {
        title: '분류',
        minWidth: 150,
        render: ({ data2 }) => {
          if (data2 === '선택') {
            return <a style={{ color: 'blue' }}>{data2}</a>;
          } else {
            return <>{data2}</>;
          }
        },
      },
      {
        title: '분류',
        minWidth: 100,
        align: 'center',
        render: ({ data3 }) => {
          if (data3 === '선택') {
            return <a style={{ color: 'blue' }}>{data3}</a>;
          } else {
            return <>{data3}</>;
          }
        },
      },
      {
        title: '분류',
        key: 'data4',
        minWidth: 60,
        style: {
          backgroundColor: theme.palette.primary['200'],
        },
      },
      {
        title: '분류',
        key: 'data5.text',
        minWidth: 120,
      },
      {
        title: '분류',
        minWidth: 60,
        render: () => {
          return <Button>그룹 생성</Button>;
        },
      },
      {
        title: '분류',
        minWidth: 80,
        render: () => {
          return <Button>유저 삭제</Button>;
        },
      },
    ],
    [handleSelect, handleSelectAll, selected],
  );

  return (
    <div style={{ height: 400, overflow: 'scroll' }}>
      <DataTable
        columns={dummyColumns}
        disabledRowCondition={({ data5 }) => data5.text === '읽음'}
        data={isEmptyMode ? [] : dummyData}
        fullWidth
        {...rest}
      />
    </div>
  );
};

export const Default = Template.bind({});
