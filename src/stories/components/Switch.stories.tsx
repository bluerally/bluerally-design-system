import { Story } from '@storybook/react';
import { Switch as SwitchComponent, SwitchProps } from '@/components/Switch';
import { useState } from 'react';

export default {
  title: 'components/Switch',
  component: SwitchComponent,
  argTypes: {},
};

const Switch = ({ checked, disabled, size }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <SwitchComponent
      checked={isChecked}
      size={size}
      onChange={() => setIsChecked((prev) => !prev)}
      disabled={disabled}
    />
  );
};

const Template: Story<SwitchProps> = (arg) => <Switch {...arg} />;

export const Default = Template.bind({});

Default.args = {};
