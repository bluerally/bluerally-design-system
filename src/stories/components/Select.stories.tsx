import { Story } from '@storybook/react';
import { useState } from 'react';

import { Select, SelectItem } from '@/components/Select';

import { Button } from '@/components';

export default {
  title: 'components/Select',
  component: Select,
  argTypes: {},
};

const drinks: SelectItem[] = [
  { title: '콜라', value: 'Cola' },
  { title: '스프라이트', value: 'Sprite', disabled: true },
  { title: 'Cider', value: 'Cider' },
  { title: 'Fanta', value: 'Fanta' },
  {
    title: 'STR 업무 관련 데이터 분석용\n- 특정 거래 건의 이상거래 분석',
    value: 'STR',
  },
  {
    title: '랜더링',
    value: 'rendered',
    render: (option) => (
      <Button size="sm" variant="outlined">
        {option?.title}
      </Button>
    ),
  },
];

const Template: Story = (args) => {
  const [value, setValue] = useState<SelectItem>();

  return (
    <div style={{ width: 340, height: 400 }}>
      <Select
        {...args}
        selected={value}
        placeholder={'한개를 선택해주세요'}
        options={drinks}
        onSelect={setValue}
      />
    </div>
  );
};

export const Default = Template.bind({});

export const MultiSelect: Story = () => {
  const [values, setValues] = useState<SelectItem[]>([]);

  return (
    <div style={{ width: 340, height: 400 }}>
      <Select
        selected={values}
        multiple
        options={drinks}
        placeholder={'여러개를 선택해주세요'}
        onSelect={setValues}
      />
    </div>
  );
};

export const SearchSingleSelect: Story = () => {
  const [value, setValue] = useState<SelectItem>();

  return (
    <div style={{ width: 340, height: 400 }}>
      <Select
        selected={value}
        options={drinks}
        placeholder={'하나만 선택해주세요(검색가능)'}
        search
        onSelect={setValue}
        chip
      />
    </div>
  );
};

export const SearchMultiSelect: Story = () => {
  const [values, setValues] = useState<SelectItem[]>([]);

  return (
    <div style={{ width: 340, height: 400 }}>
      <Select
        selected={values}
        options={drinks}
        multiple
        placeholder={'여러개를 선택해주세요'}
        search
        onSelect={setValues}
        chip
      />
    </div>
  );
};
