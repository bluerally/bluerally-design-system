import { Switch as SwitchComponent, SwitchProps } from '@/components/Switch';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'components/Switch',
  component: SwitchComponent,
  argTypes: {},
};

const Switch = ({ checked, disabled }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <SwitchComponent
      checked={isChecked}
      onChange={() => setIsChecked((prev) => !prev)}
      disabled={disabled}
      label="마감여부"
    />
  );
};

const Template: Story<SwitchProps> = (arg) => <Switch {...arg} />;

export const Default = Template.bind({});

Default.args = {};
