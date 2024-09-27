import {
  Checkbox as CheckboxComponent,
  CheckboxProps,
} from '@/components/Checkbox';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'components/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    value: {
      control: { type: 'text' },
      defaultValue: 'Checkbox1',
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Label',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
};

const Checkbox = ({ value, label, disabled, checked }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <CheckboxComponent
      value={value}
      label={label}
      disabled={disabled}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Checkbox1',
  label: 'Option 1',
  checked: false,
  disabled: false,
};
