import { Select, SelectItem } from '@/components/Select';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'components/Select',
  component: Select,
  argTypes: {},
};

const sports: SelectItem[] = [
  { title: '프리다이빙', value: 'freediving' },
  { title: '서핑', value: 'surfing' },
  { title: '수영', value: 'swimming' },
  { title: '낚시', value: 'fishing' },
  { title: '기타 등등', value: 'etc' },
];

const Template: Story = (args) => {
  const [value, setValue] = useState<SelectItem>();

  return (
    <div style={{ width: 340, height: 400 }}>
      <Select
        {...args}
        selected={value}
        placeholder={'한개를 선택해주세요'}
        options={sports}
        onSelect={setValue}
      />
    </div>
  );
};

export const Default = Template.bind({});
